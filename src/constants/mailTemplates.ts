const welcome = {
  subject: 'Welcome to MushroomShop',
  html: (username: string) => {
    return `
<div>
<p style="font-family: sans-serif;">Xin chào ${username}</p>

<p style="font-family: sans-serif;">Chào mừng bạn đến với MushRoomShop. </p>
</div>
    `;
  }
};

export default { welcome };
