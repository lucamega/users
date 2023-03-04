using webapi;
using webapi.Controllers;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton(new UserController());

var app = builder.Build();

app.MapGet("/user", (UserController userController) =>
{
    return Results.Json(userController.GetAllUsers());
});

app.MapGet("/user/{id}", (string id, UserController userController) =>
{
    var user = userController.GetUser(id);
    if (user == null)
    {
        return Results.NotFound();
    }

    return Results.Json(user);
});

app.MapPost("/user", (User user, UserController userController) =>
{
    if (string.IsNullOrEmpty(user.Id))
    {
        return Results.BadRequest("User has no Id.");
    }

    if (!userController.AddUser(user))
    {
        return Results.Conflict("User already exists.");
    }

    return Results.Created("/user/" + user.Id, user);
});

app.MapPut("/user/{id}", (string id, User user, UserController userController) =>
{
    if (!userController.EditUser(id, user))
    {
        return Results.BadRequest("User does not exist.");
    }

    return Results.Ok();
});

app.MapDelete("/user/{id}", (string id, UserController userController) =>
{
    if (!userController.RemoveUser(id))
    {
        return Results.BadRequest("User does not exist.");
    }

    return Results.Ok();
});

app.Run();
