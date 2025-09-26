//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;

namespace Infraestructure.Entities
{
   
    public class LoginLog
    {
       
        [Key]
        public int? Id { get; set; }

        public string? UserName { get; set; }
        public string? LoginTime { get; set; }
        public string? AccessToken { get; set; } 
    }
}