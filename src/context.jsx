import { createContext, useContext, useState, useMemo } from "react";

const AppContext = createContext(null);

// Mock movie data using TMDB image CDN
export const MOVIES = [
  {
    id: 1,
    title: "Cô Hầu Gái",
    originalTitle: "The Housemaid",
    year: 2025,
    rating: 7.0,
    duration: "2h 11m",
    genres: ["Kinh Dị", "Tâm Lý"],
    desc: "Một thế giới hỗn loạn mở ra, nơi sự hoàn hảo chỉ là ảo giác. Câu chuyện về một cô hầu gái bí ẩn ẩn náu trong ngôi nhà của gia đình giàu có.",
    thumb: "https://image.tmdb.org/t/p/w500/5lhVrJVEGBnFEK8ibcjrFo8UXHX.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/auVxBGOEpqqoJ3o5PwJbK5bLYz8.jpg",
    cast: ["Sydney Sweeney", "Amanda Seyfried", "Justin Theroux"],
  },
  {
    id: 2,
    title: "Minecraft: Bộ Phim",
    originalTitle: "A Minecraft Movie",
    year: 2025,
    rating: 6.8,
    duration: "1h 41m",
    genres: ["Phiêu Lưu", "Hài Hước", "Gia Đình"],
    desc: "Bốn người dị biệt gặp khó khăn khi bị cuốn vào thế giới Overworld, một vùng đất vuông vắn kỳ lạ.",
    thumb: "https://image.tmdb.org/t/p/w500/iPPTGh4Rvm0UKRmxLWGQZ4bSTS9.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/ykrCDNi6kJAXfFNJBw4HVPQ5EAJ.jpg",
    cast: ["Jack Black", "Jason Momoa", "Danielle Brooks"],
  },
  {
    id: 3,
    title: "Trăm Năm Cô Đơn",
    originalTitle: "One Hundred Years of Solitude",
    year: 2024,
    rating: 8.2,
    duration: "1h 02m",
    genres: ["Tình Cảm", "Drama"],
    desc: "Câu chuyện sử thi đầy lãng mạn về gia đình Buendía trải qua nhiều thế hệ tại làng Macondo.",
    thumb: "https://image.tmdb.org/t/p/w500/1q3DgLMqwqhwfJ8bdGXCdFZ3zcE.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
    cast: ["Marco González", "Susana Morales", "Claudio Cataño"],
  },
  {
    id: 4,
    title: "Venom: The Last Dance",
    originalTitle: "Venom: The Last Dance",
    year: 2024,
    rating: 6.0,
    duration: "1h 50m",
    genres: ["Hành Động", "Siêu Anh Hùng"],
    desc: "Eddie Brock và Venom phải đối mặt với mối đe dọa mới trong cuộc phiêu lưu cuối cùng của họ.",
    thumb: "https://image.tmdb.org/t/p/w500/k42Owka8v9kLn956ZkWExJP9qnLa.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    cast: ["Tom Hardy", "Chiwetel Ejiofor", "Juno Temple"],
  },
  {
    id: 5,
    title: "Furiosa: A Mad Max Saga",
    originalTitle: "Furiosa: A Mad Max Saga",
    year: 2024,
    rating: 7.7,
    duration: "2h 28m",
    genres: ["Hành Động", "Phiêu Lưu"],
    desc: "Câu chuyện khởi nguồn của Furiosa, từ khi bị bắt cóc khỏi bộ lạc xanh đến cuộc hành trình trả thù huyền thoại.",
    thumb: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    cast: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke"],
  },
  {
    id: 6,
    title: "Dune: Phần Hai",
    originalTitle: "Dune: Part Two",
    year: 2024,
    rating: 8.5,
    duration: "2h 46m",
    genres: ["Khoa Học Viễn Tưởng", "Hành Động", "Phiêu Lưu"],
    desc: "Paul Atreides liên minh với Chani và người Fremen trong cuộc hành trình báo thù chống lại những kẻ đã phá hủy gia đình anh.",
    thumb: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
  },
  {
    id: 7,
    title: "Deadpool & Wolverine",
    originalTitle: "Deadpool & Wolverine",
    year: 2024,
    rating: 7.7,
    duration: "2h 7m",
    genres: ["Hành Động", "Hài Hước", "Siêu Anh Hùng"],
    desc: "Deadpool được tuyển mộ bởi TVA và buộc phải làm việc cùng Logan, một phiên bản Wolverine khác.",
    thumb: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4IoTgxhCRf.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
  },
  {
    id: 8,
    title: "Alien: Romulus",
    originalTitle: "Alien: Romulus",
    year: 2024,
    rating: 7.2,
    duration: "1h 59m",
    genres: ["Kinh Dị", "Khoa Học Viễn Tưởng"],
    desc: "Nhóm người trẻ thám hiểm một trạm vũ trụ bị bỏ hoang và phải đối mặt với loài sinh vật nguy hiểm nhất vũ trụ.",
    thumb: "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/5Xx6Wt1tNhNLmk4i3TOBcqkfIIB.jpg",
    cast: ["Cailee Spaeny", "David Jonsson", "Archie Renaux"],
  },
  {
    id: 9,
    title: "Inside Out 2",
    originalTitle: "Inside Out 2",
    year: 2024,
    rating: 7.8,
    duration: "1h 40m",
    genres: ["Hoạt Hình", "Gia Đình", "Hài Hước"],
    desc: "Riley lớn lên, những cảm xúc mới xuất hiện và gây ra sự hỗn loạn trong đầu cô bé.",
    thumb: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/n6y7c3HJAB5CJLKV7B0M8o8fKnx.jpg",
    cast: ["Amy Poehler", "Maya Hawke", "Kensington Tallman"],
  },
  {
    id: 10,
    title: "Godzilla x Kong",
    originalTitle: "Godzilla x Kong: The New Empire",
    year: 2024,
    rating: 6.0,
    duration: "1h 55m",
    genres: ["Hành Động", "Khoa Học Viễn Tưởng"],
    desc: "Hai Titan huyền thoại liên minh để đối mặt với siêu sinh vật cổ đại bí ẩn đe dọa cả Trái Đất.",
    thumb: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/r2J02Z6xTMIrFKuyumXqQivKjhZ.jpg",
    cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens"],
  },
  {
    id: 11,
    title: "The Wild Robot",
    originalTitle: "The Wild Robot",
    year: 2024,
    rating: 8.3,
    duration: "1h 42m",
    genres: ["Hoạt Hình", "Gia Đình", "Phiêu Lưu"],
    desc: "Robot Roz bị mắc kẹt trên đảo hoang và buộc phải thích nghi với thiên nhiên hoang dã, nuôi dưỡng một con ngỗng mồ côi.",
    thumb: "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/9Hyc8ADlWlN7aV7Y4QKRQR8LLZS.jpg",
    cast: ["Lupita Nyong'o", "Pedro Pascal", "Kit Connor"],
  },
  {
    id: 12,
    title: "Joker: Folie à Deux",
    originalTitle: "Joker: Folie à Deux",
    year: 2024,
    rating: 5.2,
    duration: "2h 18m",
    genres: ["Tâm Lý", "Drama", "Tội Phạm"],
    desc: "Arthur Fleck đang ở Arkham và gặp gỡ Harley Quinn, người tái khơi dậy ngọn lửa Joker trong anh.",
    thumb: "https://image.tmdb.org/t/p/w500/a7ZEE7MlYpRY8O1GCGdCMfwqKWg.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/9bbHKcjqJVlfxMnPWvHU4EV5mfT.jpg",
    cast: ["Joaquin Phoenix", "Lady Gaga", "Brendan Gleeson"],
  },
];

export const GENRES = [
  "Tất Cả", "Hành Động", "Phiêu Lưu", "Hài Hước", "Kinh Dị",
  "Tình Cảm", "Khoa Học Viễn Tưởng", "Hoạt Hình", "Siêu Anh Hùng",
  "Drama", "Tâm Lý", "Tội Phạm", "Gia Đình",
];

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const toggleWishlist = (movieId) => {
    setWishlist((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const isInWishlist = (movieId) => wishlist.includes(movieId);

  const value = useMemo(
    () => ({
      wishlist,
      currentUser,
      setCurrentUser,
      selectedMovieId,
      setSelectedMovieId,
      toggleWishlist,
      isInWishlist,
    }),
    [wishlist, currentUser, selectedMovieId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
