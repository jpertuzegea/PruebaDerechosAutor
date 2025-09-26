//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using Commons.Dtos;
using Commons.Dtos.Configurations;
using Infraestructure.Interfaces;
using Interfaces.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Json;



namespace Services.Services
{
    public class UserService : IUserServices
    {
        private readonly IConfiguration configuration;
        private readonly IUnitOfWork unitofwork;

        public UserService(IConfiguration _configuration, IUnitOfWork _unitofwork)
        {
            configuration = _configuration;
            unitofwork = _unitofwork;
        }

        /// <inheritdoc />
        public async Task<ResultModel<UserDto[]>> UserList()
        {
            try
            {
                using var client = new HttpClient();
                client.BaseAddress = new Uri("https://apps.derechodeautor.gov.co/dummyjson/api/");

                var result = await client.GetFromJsonAsync<UserDto[]>("users");

                return new ResultModel<UserDto[]>
                {
                    HasError = false,
                    Data = result.ToArray(),
                    Messages = "Users listed successfully"
                };
            }
            catch (Exception ex)
            {
                return new ResultModel<UserDto[]>
                {
                    HasError = true,
                    Messages = "Technical error listing Users",
                    Data = Array.Empty<UserDto>(),
                    ExceptionMessage = ex.ToString()
                };
            }
        }
    }
}