//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using Commons.Dtos;
using Commons.Dtos.Configurations;
using Infraestructure.Entities;

namespace Interfaces.Interfaces
{
    /// <summary>
    /// Define el contrato para los servicios relacionados con la gestión 
    /// de Users dentro del sistema.
    /// 
    /// Incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar),
    /// así como listados y búsquedas por identificador.
    /// </summary>
    public interface IUserServices
    {
        /// <summary>
        /// Agrega un nuevo User al sistema.
        /// </summary>
        /// <param name="User">
        /// Objeto <see cref="User"/> que contiene la información del
        /// User a registrar.
        /// </param> 
        //Task<ResultModel<string>> UserAdd(UserDto User);

        /// <summary>
        /// Obtiene la lista completa de todos los Users disponibles.
        /// </summary> 
        Task<ResultModel<UserDto[]>> UserList();

        /// <summary>
        /// Busca un User por su identificador único.
        /// </summary>
        /// <param name="Id">
        /// Identificador único del User que se desea consultar.
        /// </param> 
        //Task<ResultModel<UserDto>> GetUserByUserId(int Id);

        ///// <summary>
        ///// Actualiza los datos de un User existente.
        ///// </summary>
        ///// <param name="UserModel">
        ///// Objeto <see cref="User"/> que contiene los datos 
        ///// actualizados del User.
        ///// </param> 
        //Task<ResultModel<string>> UserUpdate(UserDto UserModel);

        ///// <summary>
        ///// Elimina un User del sistema mediante su identificador único.
        ///// </summary>
        ///// <param name="UserId">
        ///// Identificador único del User que se desea eliminar.
        ///// </param> 
        //Task<ResultModel<string>> UserDelete(int UserId);
    }
}