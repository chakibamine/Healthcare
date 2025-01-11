import axios from 'axios';

const BASE_URL = 'http://localhost:5167/api/chat';

export const chatService = {
  async getMessages(chatId) {
    const response = await axios.get(`${BASE_URL}/messages/${chatId}`);
    return response.data;
  },

  async sendMessage(chatId, role, content) {
    console.log("Sending message with:", { chatId, role, content });
    const response = await axios.post(`${BASE_URL}/send`, {
      chatId: parseInt(chatId),
      sender: role,
      content: content
    });
    return response.data;
  }
}; 