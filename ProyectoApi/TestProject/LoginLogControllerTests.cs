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
using Moq;
using Proyecto.Controllers;

namespace Proyecto.Tests.Controllers
{
    public class LoginLogControllerTests
    {
        private readonly Mock<ILoginLogServices> _mockLoginLogServices;
        private readonly LoginLogController _controller;

        public LoginLogControllerTests()
        {
            _mockLoginLogServices = new Mock<ILoginLogServices>();
            _controller = new LoginLogController(_mockLoginLogServices.Object);
        }

        [Fact]
        public async Task LoginLog_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            var logs = new[]
            {
                new LoginLog { Id = 1, UserName = "jorge" },
                new LoginLog { Id = 2, UserName = "maria" }
            };

            var expectedResult = new ResultModel<LoginLog[]>
            {
                HasError = false,
                Data = logs
            };

            _mockLoginLogServices
                .Setup(s => s.LoginLogList())
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.LoginLog();

            // Assert
            var actionResult = Assert.IsType<ActionResult<ResultModel<LoginLog[]>>>(result);
            var okResult = Assert.IsType<ResultModel<LoginLog[]>>(actionResult.Value);

            Assert.False(okResult.HasError);
            Assert.Equal(2, okResult.Data.Length);
            Assert.Equal("jorge", okResult.Data[0].UserName);
        }

        [Fact]
        public async Task LoginLog_ReturnsError_WhenServiceFails()
        {
            // Arrange
            var expectedResult = new ResultModel<LoginLog[]>
            {
                HasError = true,
                Messages = "Error al obtener los logs"
            };

            _mockLoginLogServices
                .Setup(s => s.LoginLogList())
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.LoginLog();

            // Assert
            var actionResult = Assert.IsType<ActionResult<ResultModel<LoginLog[]>>>(result);
            var badResult = Assert.IsType<ResultModel<LoginLog[]>>(actionResult.Value);

            Assert.True(badResult.HasError);
            Assert.Equal("Error al obtener los logs", badResult.Messages);
        }

        [Fact]
        public async Task LoginLog_CallsServiceOnce()
        {
            // Arrange
            _mockLoginLogServices
                .Setup(s => s.LoginLogList())
                .ReturnsAsync(new ResultModel<LoginLog[]> { HasError = false });

            // Act
            await _controller.LoginLog();

            // Assert
            _mockLoginLogServices.Verify(s => s.LoginLogList(), Times.Once);
        }
    }
}
