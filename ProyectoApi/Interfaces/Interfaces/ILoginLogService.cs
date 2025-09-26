//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using Commons.Dtos.Configurations;
using Infraestructure.Entities;

namespace Interfaces.Interfaces
{

    public interface ILoginLogServices
    {

        Task<ResultModel<string>> LoginLogAdd(LoginLog LoginLog);

        Task<ResultModel<LoginLog[]>> LoginLogList();


    }
}