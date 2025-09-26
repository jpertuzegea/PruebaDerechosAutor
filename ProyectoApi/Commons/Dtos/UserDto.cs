//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025ate>
//-----------------------------------------------------------------------

namespace Commons.Dtos
{
    /// <summary>
    /// Representa el objeto de datos de usuario (DTO) 
    /// que se obtiene como respuesta del API de autenticación.
    /// </summary>
    public class UserDto
    {
        /// <summary>
        /// Identificador único del usuario.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre de usuario utilizado para autenticación/login.
        /// </summary>
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Correo electrónico del usuario.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Nombre propio del usuario.
        /// </summary>
        public string FirstName { get; set; } = string.Empty;

        /// <summary>
        /// Apellido del usuario.
        /// </summary>
        public string LastName { get; set; } = string.Empty;

        /// <summary>
        /// Género del usuario (ejemplo: "male", "female").
        /// </summary>
        public string Gender { get; set; } = string.Empty;

        /// <summary>
        /// Momento en que se generó el token (Unix timestamp).
        /// </summary>
        public long Iat { get; set; }

        /// <summary>
        /// Momento en que expira el token (Unix timestamp).
        /// </summary>
        public long Exp { get; set; }

        /// <summary>
        /// Token JWT generado tras el login, 
        /// usado para autenticar llamadas posteriores al API.
        /// </summary>
        public string Token { get; set; } = string.Empty;
    }
}
