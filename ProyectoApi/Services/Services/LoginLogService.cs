//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using Commons.Dtos.Configurations;
using Infraestructure.Entities;
using Infraestructure.Interfaces;
using Interfaces.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Json;



namespace Services.Services
{
    public class LoginLogServices : ILoginLogServices
    {
        private readonly IConfiguration configuration;
        private readonly IUnitOfWork unitofwork;

        public LoginLogServices(IConfiguration _configuration, IUnitOfWork _unitofwork)
        {
            configuration = _configuration;
            unitofwork = _unitofwork;
        }

        public async Task<ResultModel<string>> LoginLogAdd(LoginLog LoginLog)
        {
            try
            {
 
                unitofwork.GetRepository<LoginLog>().Add(LoginLog);

                int rowsAffected = await unitofwork.SaveChangesAsync();
                if (rowsAffected <= 0)
                {
                    return new ResultModel<string>
                    {
                        HasError = true,
                        Messages = "LoginLog could not be created",
                        Data = string.Empty
                    };
                }
                 
                return new ResultModel<string>
                {
                    HasError = false,
                    Messages = "LoginLog successfully created",
                    Data = string.Empty
                };
            }
            catch (Exception ex)
            {
                return new ResultModel<string>
                {
                    HasError = true,
                    Messages = $"Technical error creating LoginLog: {ex.Message}",
                    ExceptionMessage = ex.ToString(),
                    Data = string.Empty
                };
            }
        }

        /// <inheritdoc />
        public async Task<ResultModel<LoginLog[]>> LoginLogList()
        {

            try
            {
                var LoginLog = await unitofwork.GetRepository<LoginLog>().Get();

                if (LoginLog == null)
                {
                    return new ResultModel<LoginLog[]>
                    {
                        HasError = false,
                        Messages = "LoginLog not found",
                        ExceptionMessage = string.Empty,
                        Data = null
                    };
                }

                return new ResultModel<LoginLog[]>
                {
                    HasError = false,
                    Messages = "LoginLog found successfully",
                    ExceptionMessage = string.Empty,
                    Data = LoginLog.ToArray()
                };
            }
            catch (Exception ex)
            {
                return new ResultModel<LoginLog[]>
                {
                    HasError = true,
                    Messages = $"Technical error retrieving LoginLog: {ex.Message}",
                    ExceptionMessage = ex.ToString(),
                    Data = null
                };
            }
        }


    }
}