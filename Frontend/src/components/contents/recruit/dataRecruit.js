export default {
  zombie: {
    userName: 'Zombie phá hoại',
    kind: 'zombie',
    martialArt: 150,
    avoid: 17,
    propUp: 7,
    critical: 7,
    position: 5,
    armor: 7,
    hp: 1700,
    srcImage: '/static/images/zombie.png',
    description: 'Ta sẽ ăn hết rau của ngươi! haha',
    condition: {
      level: 5,
      money: 1500,
      famePoint: 200,
      diamond: 0
    }
  },
  robot: {
    userName: 'Rô-Bốt hủy diệt',
    kind: 'robot',
    martialArt: 250,
    avoid: 10,
    propUp: 25,
    critical: 10,
    position: 6,
    armor: 80,
    hp: 3000,
    srcImage: '/static/images/robot.png',
    description: 'Xứ mệnh của ta là bảo vệ trái đất',
    condition: {
      level: 10,
      money: 3500,
      famePoint: 500,
      diamond: 5
    }
  }
}
