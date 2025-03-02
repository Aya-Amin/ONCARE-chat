import { Test, TestingModule } from "@nestjs/testing";
import { MessagesService } from "../src/messages/messages.service";

describe("MessagesService", () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it("should send a message", async () => {
    const message = await service.sendMessage({
      conversationId: "1",
      senderId: "1",
      content: "Hello!",
    });
    expect(message).toBeDefined();
    expect(message.content).toBe("Hello!");
  });

  it("should retrieve messages for a conversation", async () => {
    const messages = await service.getMessagesByConversation("1");
    expect(messages).toBeDefined();
    expect(messages.length).toBeGreaterThan(0);
  });
});
