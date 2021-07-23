export const subject = 'Verify your email address';

export const template = (
  username: string,
  link = 'https://www.google.com/'
) => `
<div>
<p style="font-family: sans-serif;">Xin chào ${username}</p>

<p style="font-family: sans-serif;">
Chào mừng bạn đến với MushRoomShop. Để có thể sử dụng dịch vụ của chúng
tôi, vui lòng xác thực địa chỉ email của bạn bằng cách nhấn vào đường
dẫn dưới đây:
</p>

<p style="font-family: sans-serif;">
<a style="font-family: sans-serif; color: #006dcf;" href="/">${link}</a>
</p>
</div>
`;

export default { subject, template };
