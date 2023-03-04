namespace webapi.Controllers;

public class UserController
{
    // This should be in a database.
    private static readonly List<User> _users = new()
    {
        new User()
        {
            Id = "jdoe",
            Name = "John Doe",
            Address = "9268 Front Drive - Detroit, MI 48205",
            Age = 33
        },
        new User()
        {
            Id = "jsmith",
            Name = "Jane Smith",
            Address = "45 Prairie Street - Stow, OH 44224",
            Age = 44
        }
    };

    public List<User> GetAllUsers()
    {
        return _users;
    }

    public User GetUser(string id)
    {
        for (int i = 0; i < _users.Count; i++)
        {
            var user = _users[i];
            if (id == user.Id)
            {
                return user;
            }
        }

        return null;
    }

    public bool EditUser(string id, User newUser)
    {
        for (int i = 0; i < _users.Count; i++)
        {
            var user = _users[i];
            if (id == user.Id)
            {
                user.Name = newUser.Name;
                user.Age = newUser.Age;
                user.Address = newUser.Address;
                return true;
            }
        }

        return false;
    }

    public bool AddUser(User newUser)
    {
        for (int i = 0; i < _users.Count; i++)
        {
            var user = _users[i];
            if (newUser.Id == user.Id)
            {
                return false;
            }
        }

        _users.Add(newUser);
        return true;
    }

    public bool RemoveUser(string id)
    {
        for (int i = 0; i < _users.Count; i++)
        {
            var user = _users[i];
            if (id == user.Id)
            {
                _users.RemoveAt(i);
                return true;
            }
        }

        return false;
    }
}
