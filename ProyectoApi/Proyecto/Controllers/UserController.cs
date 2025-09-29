//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using Commons.Dtos;
using Commons.Dtos.Configurations;
using Interfaces.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Proyecto.Controllers
{
    [Route("api/User")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : ControllerBase
    {

        private readonly IUserServices IUserServices;

        public UserController(IUserServices IUserervices)
        {
            this.IUserServices = IUserervices;
        }


        /// <summary>
        /// Lista todos los Users 
        /// </summary>
        [HttpGet("UserList")]
        public async Task<ActionResult<ResultModel<UserDto[]>>> User()
        {
            return await IUserServices.UserList();
        }

         
    }
}