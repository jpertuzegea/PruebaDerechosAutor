//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using Commons.Dtos.Configurations;
using Infraestructure.Entities;
using Interfaces.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Proyecto.Controllers
{
    [Route("api/LoginLog")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class LoginLogController : ControllerBase
    {

        private readonly ILoginLogServices ILoginLogServices;

        public LoginLogController(ILoginLogServices ILoginLogervices)
        {
            this.ILoginLogServices = ILoginLogervices;
        }


        /// <summary>
        /// Lista todos los LoginLogs 
        /// </summary>
        [HttpGet("LoginLogList")]
        public async Task<ActionResult<ResultModel<LoginLog[]>>> LoginLog()
        {
            return await ILoginLogServices.LoginLogList();
        }


    }
}