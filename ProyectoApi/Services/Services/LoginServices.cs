//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using Commons.Dtos;
using Commons.Dtos.Configurations;
using Interfaces.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Utilities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace Services.Services
{

    public class LoginServices : ILoginServices
    {
        private readonly IConfiguration configuration;
        private readonly ILoginLogServices _ILoginLogServices;

        public LoginServices(IConfiguration _configuration, ILoginLogServices ILoginLogServices)
        {
            configuration = _configuration;
            _ILoginLogServices = ILoginLogServices;
        }

        /// <inheritdoc />
        public async Task<ResultModel<LoginDto>> Login(LoginDto LoginDto)
        {
            ResultModel<LoginDto> ResultModel = new ResultModel<LoginDto>();

            try
            {
                if (string.IsNullOrWhiteSpace(LoginDto.UserNetwork) || string.IsNullOrWhiteSpace(LoginDto.Password))
                {
                    ResultModel.HasError = false;
                    ResultModel.Data = null;
                    ResultModel.Messages = "Usuario y Clave son requeridos";
                    return ResultModel;
                }

                using var client = new HttpClient();
                client.BaseAddress = new Uri("https://apps.derechodeautor.gov.co/dummyjson/api/");

                var loginData = new { username = LoginDto.UserNetwork, password = LoginDto.Password };


                var json = JsonSerializer.Serialize(loginData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");


                var response = await client.PostAsync("users/login", content);

                if (response.IsSuccessStatusCode)
                {
                    string responseString = await response.Content.ReadAsStringAsync();
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };

                    UserDto? user = JsonSerializer.Deserialize<UserDto>(responseString, options);

                    LoginDto.IsLogued = true;
                    LoginDto.Token = user.Token;
                    LoginDto.Password = "";
                    LoginDto.User = user;

                    ResultModel.HasError = false;
                    ResultModel.Data = LoginDto;
                    ResultModel.Messages = "Usuario Logueado Con Exito";


                    await _ILoginLogServices.LoginLogAdd(new Infraestructure.Entities.LoginLog() {                     
                    UserName = LoginDto.UserNetwork,
                    LoginTime = UtilitiesDate.GetCurrentHourAndDateLocalString(),
                    AccessToken = user.Token
                    });


                }
                else
                {
                    LoginDto.IsLogued = false;
                    LoginDto.Token = "";
                    LoginDto.Password = "";

                    ResultModel.HasError = true;
                    ResultModel.Data = LoginDto;
                    ResultModel.Messages = await response.Content.ReadAsStringAsync(); ;

                }

                return ResultModel;
            }
            catch (Exception Error)
            {
                ResultModel.HasError = true;
                ResultModel.Messages = $"Error Técnico Al Iniciar Sesion: {Error.Message}";
                ResultModel.Data = null;
                ResultModel.ExceptionMessage = Error.ToString();

                return ResultModel;
            }
        }

    }
}