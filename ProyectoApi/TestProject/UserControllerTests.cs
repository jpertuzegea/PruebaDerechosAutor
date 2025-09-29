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
using Moq;
using Proyecto.Controllers;

namespace Proyecto.Tests.Controllers
{
    public class UserControllerTests
    {
        private readonly Mock<IUserServices> _mockUserServices;
        private readonly UserController _controller;

        public UserControllerTests()
        {
            _mockUserServices = new Mock<IUserServices>();
            _controller = new UserController(_mockUserServices.Object);
        }

        [Fact]
        public async Task User_ReturnsOk_WhenServiceReturnsData()
        {
            // Arrange
            var users = new[]
            {
                new UserDto { Id = 1, Username = "jorge" },
                new UserDto { Id = 2, Username = "maria" }
            };

            var expectedResult = new ResultModel<UserDto[]>
            {
                HasError = false,
                Data = users
            };

            _mockUserServices
                .Setup(s => s.UserList())
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.User();

            // Assert
            var actionResult = Assert.IsType<ActionResult<ResultModel<UserDto[]>>>(result);
            var okResult = Assert.IsType<ResultModel<UserDto[]>>(actionResult.Value);

            Assert.False(okResult.HasError);
            Assert.Equal(2, okResult.Data.Length);
            Assert.Equal("jorge", okResult.Data[0].Username);
        }

        [Fact]
        public async Task User_ReturnsError_WhenServiceFails()
        {
            // Arrange
            var expectedResult = new ResultModel<UserDto[]>
            {
                HasError = true,
                Messages = "Error al obtener los usuarios"
            };

            _mockUserServices
                .Setup(s => s.UserList())
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.User();

            // Assert
            var actionResult = Assert.IsType<ActionResult<ResultModel<UserDto[]>>>(result);
            var errorResult = Assert.IsType<ResultModel<UserDto[]>>(actionResult.Value);

            Assert.True(errorResult.HasError);
            Assert.Equal("Error al obtener los usuarios", errorResult.Messages);
        }

        [Fact]
        public async Task User_CallsServiceOnce()
        {
            // Arrange
            _mockUserServices
                .Setup(s => s.UserList())
                .ReturnsAsync(new ResultModel<UserDto[]> { HasError = false });

            // Act
            await _controller.User();

            // Assert
            _mockUserServices.Verify(s => s.UserList(), Times.Once);
        }
    }
}
