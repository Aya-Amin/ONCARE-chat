import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../src/users/users.service";

describe("AuthService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should sign up a new user", async () => {
    const user = await service.signup({
        userName: "test user",
        email: "test@example.com",
        password: "password123",

    });
    expect(user).toBeDefined();
    expect(user.email).toBe("test@example.com");
  });

  it("should authenticate a user", async () => {
    const user = await service.login({
      email: "test@example.com",
      password: "password123",
    });
    expect(user).toBeDefined();
    expect(user.token).toBeDefined();
  });
});
