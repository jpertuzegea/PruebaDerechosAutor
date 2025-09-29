//----------------------------------------------------------------------- 
// Copyright (c) 2019 All rights reserved.
// </copyright>
// <author>Jorge Pertuz Egea/Jpertuz</author>
// <date>Septiembre 2025</date>
//-----------------------------------------------------------------------

using Commons.Dtos.Configurations;
using Interfaces.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Proyecto.Controllers;

namespace ProjectTestunitaryAuthor
{
    public class LoginControllerTests
    {
        private readonly Mock<ILoginServices> _mockLoginServices;
        private readonly Proyecto.Controllers.LoginController _controller;

        public LoginControllerTests()
        {
            _mockLoginServices = new Mock<ILoginServices>();
            _controller = new LoginController(_mockLoginServices.Object);
        }

        [Fact]
        public async Task LogIn_ReturnsResultModel_WhenServiceReturnsSuccess()
        {
            // Arrange
            var loginDto = new LoginDto { UserNetwork = "jorge", Password = "123456789" };

            var expectedResult = new ResultModel<LoginDto>
            {
                Data = loginDto,
                HasError = true,
                Messages = "Login exitoso"
            };

            _mockLoginServices
                .Setup(s => s.Login(It.IsAny<LoginDto>()))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.LogIn(loginDto);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ResultModel<LoginDto>>>(result);
            var returnValue = Assert.IsType<ResultModel<LoginDto>>(actionResult.Value);

            Assert.True(returnValue.HasError);
            Assert.Equal("jorge", returnValue.Data.UserNetwork);

            _mockLoginServices.Verify(
                s => s.Login(It.Is<LoginDto>(dto => dto.UserNetwork == loginDto.UserNetwork && dto.Password == loginDto.Password)),
                Times.Once);
        }

        [Fact]
        public async Task LogIn_ReturnsFailure_WhenInvalidCredentials()
        {
            // Arrange
            var loginDto = new LoginDto { UserNetwork = "jorge", Password = "wrongpass" };

            var expectedResult = new ResultModel<LoginDto>
            {
                Data = null,
                HasError = false,
                Messages = "Credenciales inválidas"
            };

            _mockLoginServices
                .Setup(s => s.Login(It.IsAny<LoginDto>()))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.LogIn(loginDto);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ResultModel<LoginDto>>>(result);
            var returnValue = Assert.IsType<ResultModel<LoginDto>>(actionResult.Value);

            Assert.False(returnValue.HasError);
            Assert.Null(returnValue.Data);
            Assert.Equal("Credenciales inválidas", returnValue.Messages);

            _mockLoginServices.Verify(
                s => s.Login(It.Is<LoginDto>(dto => dto.UserNetwork == loginDto.UserNetwork && dto.Password == loginDto.Password)),
                Times.Once);
        }
    }
}
