/* ===== Kình Thiên Kiếm Đế — nhân vật, hành trình, công pháp & bảo vật =====
   Dựa trên ~220 chương mẫu; mỗi mục có số chương để kiểm chứng. */
(function(){
const people=[
  ['gd','Lâm Bạch','Nhân vật chính, con độc nhất của tiền gia chủ Lâm gia ở Linh Tê thành; thức tỉnh Thôn Phệ Kiếm Hồn bị coi là phế võ hồn, từ Lĩnh Đông đánh khắp Man Cổ đại lục rồi vào Ma giới.',['thanvo','thantich','linhnam','dongchau','tuchau','madong','cuuu'],[1,2,1199,4060,7057]],
  ['gd','Lâm Đạc','Cha Lâm Bạch, tiền gia chủ Lâm gia, Địa cấp cửu phẩm võ hồn, bỏ đi không lời từ biệt. Hơn 20 năm trước là kiếm tu từng nói "Đông châu thiên kiêu, trừ ta ra, đều là phế vật".',['thanvo','dongchau'],[1,837,1860,3624]],
  ['dt','Lâm Tử Nhi','Con gái Đại trưởng lão Lâm gia, cùng Lâm Bạch được gọi là "Kim đồng ngọc nữ"; thức tỉnh Thiên cấp ngũ phẩm võ hồn Hồng Hoang Thần Nữ Đạo rồi quay lưng với Lâm Bạch.',['thanvo'],[1,32,650,654]],
  ['hn','Diệp Túc Tâm (Chiêu Nguyệt)','Vị hôn thê của Tô Thương, ban đầu kết thù với Lâm Bạch; bị bắt làm con tin (ch.1271). Về sau Lâm Bạch gặp Chiêu Nguyệt và hỏi nàng là Chiêu Nguyệt hay Diệp Túc Tâm.',['thanvo','thantich','tuchau'],[47,154,1271,2399,2881]],
  ['hn','Tô Tiên Mị','Điếm chủ chi nhánh Tàng Bảo lâu, một trong mười tám trưởng lão; về sau là người Thiên Bảo lâu, theo Lâm Bạch tới Trung Ương Thánh Quốc.',['thanvo','linhnam','tuchau'],[25,321,1713,3561]],
  ['hn','Bạch Tiêu Tiêu','Có siêu thoát võ hồn khiến người chết sống lại, "khu sinh vãng tử"; được gọi là Nữ đế ở trận Thanh Long điện.',['thantich','linhnam','tuchau'],[719,1161,1754,2616]],
  ['hn','Hồ Tâm Nhi','Hồ Yêu Vương: "Có thể làm cho ta Hồ Tâm Nhi cam nguyện phục thị nam nhân, hắn nhất định phải là đỉnh thiên lập địa tồn tại!"',['dongchau'],[2129,2141]],
  ['hn','Tần Dao','Sư tỷ đồng môn, đề nghị giao dịch với Lâm Bạch khi hắn mua Thiên Niên Phượng Mi luyện Thiên Đỉnh Thần Hoa Đan.',['madong'],[4940,4993,5005]],
  ['dh','Kiếm Nhược Hàn','Kiếm tu Danh Kiếm sơn trang, cầm Kinh Mộng Kiếm; siêu thoát võ hồn có hàn khí đóng băng thiên địa.',['thanvo','thantich','tuchau'],[592,1001,1161,3549]],
  ['dh','Con quạ','Con quạ đen có linh tính bám theo Lâm Bạch; ban đầu chỉ có tu vi Thần Đan cảnh.',['tuchau'],[2422,3676,3758,3898]],
  ['dh','Điếu Ngư Ông','Ông câu cá Lâm Bạch gặp ở Võ Ý sơn, thật ra là khí linh Tạo Hóa Thần Cung; trao Tạo Hóa Lệnh, nhận Lâm Bạch làm chủ.',['thantich'],[1186,1199]],
  ['cg','Diệp Vô Hoan','Một trong ba chưởng giáo Thần Tích lĩnh, chủ Thánh Dạ vương triều.',['thantich','thanvo'],[501,1081,1258]],
  ['dt','Từ Giang Thắng','Định tố cáo bí mật võ hồn của Lâm Bạch với Diệp Vô Hoan và bị giết; bí mật Thôn Phệ Kiếm Hồn được giữ.',['thantich'],[1081]],
  ['dt','Tô Thương','Vị hôn phu của Diệp Túc Tâm; bắt nàng để ép Lâm Bạch.',['thanvo','thantich'],[154,1271]]
];
const journey=[
  [1,'thanvo','Lâm Bạch ở Linh Tê thành, Lâm gia; Lâm Tử Nhi thức tỉnh Thiên cấp võ hồn.'],
  [2,'thanvo','Thức tỉnh Thôn Phệ Kiếm Hồn.'],
  [20,'thanvo','Diệt Kình Thiên minh.'],
  [32,'thanvo','Đánh bại Lâm Tử Nhi.'],
  [61,'thanvo','Đột phá Chân Võ.','chanvo'],
  [141,'thanvo','Lên Huyền Võ ở nội môn Linh Kiếm tông.','huyenvo'],
  [501,'thanvo','Lên Thiên Võ cửu trọng.','thienvo'],
  [604,'thanvo','Đột phá Nhân Đan.','nhandan'],
  [654,'thanvo','Lâm Tử Nhi chết.'],
  [761,'thantich','Vào Kiếm Đạo viện ở Thần Tích lĩnh.'],
  [887,'thantich','Học Mạc Vấn Kiếm.'],
  [1021,'thantich','Địa Đan tam trọng, săn tích phân ở Hồng Hoang giới.','diadan'],
  [1121,'thantich','Thiên Đan lục trọng.','thiendan'],
  [1199,'thantich','Thành chủ Tạo Hóa Thần Cung, nhận Tạo Hóa Lệnh.'],
  [1290,'thantich','Đột phá Phi Thiên.','phithien'],
  [1361,'linhnam','Vào Thông Thiên Kiếm phái ở Lĩnh Nam.'],
  [1411,'linhnam','Âm Thánh tam trọng.','amthanh'],
  [1532,'linhnam','Lần đầu xuất kiếm Tru Tiên.'],
  [1640,'linhnam','Thôn Phệ Kiếm Hồn giúp lên Dương Thần.','duongthan'],
  [1834,'dongchau','Qua truyền tống tới Đông châu.'],
  [2046,'dongchau','Đột phá Sinh Diệt.','sinhdiet'],
  [2480,'dongchau','Đột phá Tử Nghịch.','tunghich'],
  [2551,'tuchau','Mặc Huyết Thần Bào đánh Hắc Sơn, Tàn Kiếm bộ lạc.'],
  [2661,'tuchau','Dự luận võ ở Thiên Kiếm thành.'],
  [3067,'tuchau','Đột phá Vấn Đỉnh.','vandinh'],
  [4060,'madong','Trọng thương vào Ma giới.'],
  [4607,'madong','Đạo Thần thất phẩm.','daothan'],
  [4921,'thuykinh','Vào Thiên Thủy tông, gặp Thủy Kính thế giới.'],
  [5606,'madong','Đột phá Thái Ất Đạo Quả.','thaiat'],
  [6223,'liepgioi','Vào Liệp giới.'],
  [6628,'mabac','Xuất quan ở Thái Ất thượng phẩm.'],
  [6902,'cuuu','Con đường tấn thăng ở Cửu U Ma Cung.'],
  [7057,'cuuu','Đột phá Đại La Đạo Quả.','daila']
];
const arts=[
  ['hm','Thôn Phệ Kiếm Hồn','Võ hồn bị coi là phế, nuốt được sức mạnh để tu luyện; "không nhìn thiên mệnh", ý thiên địa không tha.',[2,529,1161,2839]],
  ['tt','Thôn Phệ Lĩnh Vực','Lĩnh vực thôn phệ của Lâm Bạch.',[915]],
  ['cp','Mạc Vấn Kiếm','"Chớ hỏi trời, chớ hỏi đất, chỉ hỏi tâm"; kiếm thuật mạnh nhất Thần Tích lĩnh, mỗi chiêu tốn mười vạn tích phân.',[887,927,1005,1174]],
  ['tt','Tru Tiên','Một kiếm mạnh nhất Lâm Bạch dồn hết tu vi, uy năng theo tu vi; sau thành Cửu trọng ý cảnh Tru Tiên.',[1532,2040,2424]],
  ['bv','Huyết Thần Bào','Mặc vào có thực lực Vấn Đỉnh cảnh đỉnh phong.',[2551,2561]],
  ['bv','Tạo Hóa Thần Cung','Di tích Xích Tiên tông ở Thần Tích lĩnh; ai có Tạo Hóa Lệnh là chưởng giáo đương đại.',[1186,1199]],
  ['bv','Tạo Hóa Lệnh','Lệnh bài Điếu Ngư Ông trao; luyện hóa thì hai khí linh nhận chủ.',[1199]],
  ['hm','Phong Lôi Kiếm Hồn','Kiếm hồn xuất hiện ở ch.1074.',[1074]],
  ['hm','Cực Đạo Băng Kiếm Hồn','"Siêu thoát thiên mệnh".',[1142]]
];
const st=STORIES.find(s=>s.id==='kinh-thien-kiem-de');
st.people=people.map(([g,n,d,w,ch])=>({g,n,d,w,ch}));
st.journey=journey.map(([ch,w,d,r])=>({ch,w,d,r:r||null}));
st.arts=arts.map(([g,n,d,ch,rank])=>({g,n,d,ch,rank:rank||null}));
})();
