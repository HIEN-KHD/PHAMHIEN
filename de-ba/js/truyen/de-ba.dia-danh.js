/* ===== Đế Bá — địa danh của từng thế giới =====
   Mỗi mục: [loại, tên, mô tả, [chương], thuộc, quy mô 1–5] */
(function(){
const PL={
  nhanhoang:[
    ['vung','Đại Trung Vực','Vực có Tẩy Nhan Cổ Phái, Bảo Trụ Thánh Tông; nơi Lý Thất Dạ khởi đầu.',[27,105,339],null,5],
    ['quoc','Bảo Thánh thượng quốc','Cương quốc nơi Tẩy Nhan Cổ Phái tọa lạc.',[1,105],'Đại Trung Vực',3],
    ['tong','Tẩy Nhan Cổ Phái','Từng là đế thống tiên môn tung hoành Bát Hoang, nay xuống dốc; Lý Thất Dạ làm thủ tịch đại đệ tử.',[1,3,27],'Đại Trung Vực',4],
    ['tong','Cửu Thánh Yêu Môn','Yêu môn kết thông gia với Tẩy Nhan Cổ Phái; có Loạn Tâm Lâm mười bốn tầng.',[5,8,14],'Đại Trung Vực',4],
    ['hiem','Loạn Tâm Lâm','Rừng mười bốn tầng do Thủy tổ Cửu Thánh Đại Hiền lập; vào là sinh ảo giác.',[14],'Cửu Thánh Yêu Môn',2],
    ['tong','Thánh Thiên Giáo','Kẻ thù sinh tử của Tẩy Nhan Cổ Phái; ba vạn năm trước cướp đi đại lượng đế thuật.',[27,105,1093],'Đại Trung Vực',4],
    ['tong','Bảo Trụ Thánh Tông','Hiển hách cả Nhân Hoàng giới dù chưa sinh Tiên Đế; có Đại Hiền gần Tiên thể đại thành.',[105,131,196],'Đại Trung Vực',4],
    ['quoc','Thanh Huyền cổ quốc','Song đế truyền thừa, đời nào cũng có Đại Hiền.',[183,196],null,4],
    ['quoc','Nam Thiên thượng quốc','Truyền thừa còn xưa hơn Thanh Huyền cổ quốc và Tẩy Nhan Cổ Phái, có hộ quốc Thần thú.',[144,196,222],null,3],
    ['thanh','Thiên Cổ thành','Thành rồng rắn lẫn lộn; có Cổ Ý Trai, cổ nhai trên không.',[157,170],null,3],
    ['hiem','Thiên Cổ Thi Địa','Cấm địa xác chết; các đại giáo khiêng quan tài đến, có U Minh thuyền.',[170,196,235],null,3],
    ['vung','Đông Bách Thành','Vùng có Trường Hà tông "một môn tam đế" và Thiên Đạo Viện.',[157,274,300],null,4],
    ['tong','Thiên Đạo Viện','Học viện có thủ hộ thần Vực Thần; Lý Thất Dạ vào học, ước chiến.',[248,274,352],'Đông Bách Thành',4],
    ['tong','Trường Hà tông','"Một môn tam đế", cự phách không ai rung chuyển ở Đông Bách Thành; Mai Tố Dao xuất thân.',[157,274],'Đông Bách Thành',4],
    ['tong','Chiến Thần Điện','Điện có hệ thống bồi dưỡng riêng; Cửu Thánh Yêu Môn tranh thủ nhờ Lý Thất Dạ.',[183,235,248],null,3],
    ['tong','Hổ Khiếu tông','Yêu đạo đại tông; Lý Thất Dạ độc xông (ch.362).',[300,362,365],'Đông Bách Thành',2],
    ['hiem','Đạp Không Sơn','Truyền thừa của Đạp Không Tiên Đế; truyền nhân Cơ Không Vô Địch.',[274,313],null,3],
    ['vung','Nam Xích Địa','Vùng phía nam, có Nam Đường ở cực tây nam, Thánh Thành, Diệp Tông.',[937,950,989],null,4],
    ['thanh','Thánh Thành','Thành tụ tập thế hệ trẻ; Lý Thất Dạ ở Từ phủ.',[950,963],'Nam Xích Địa',3],
    ['hiem','Phục Long Sơn','Núi có thai động; Lý Thất Dạ dọc lưng núi khảo sát đại địa.',[950,963],'Nam Xích Địa',2],
    ['hiem','Thần Chiến Sơn','Núi áp chế mọi người; đột nhiên dâng tiên hà.',[937,978,989],'Nam Xích Địa',3],
    ['toc','Huyết Ma tộc','Tộc dốc toàn lực, hàng trăm Đại Hiền thống quân đánh Lý Thất Dạ.',[989,1002],'Nam Xích Địa',3],
    ['vung','Đế Cương','Truyền thuyết Đế Chủ là chủ nhân Đế Cương; Lý Thất Dạ đi về phía bắc.',[859,1067,1093],null,4],
    ['hiem','Linh Sơn','Thánh sơn Phật môn; Lý Thất Dạ chống Tam Đại tự, phật quang dâng trào.',[1028,1041],null,3],
    ['hiem','Đế Ma tiểu thế giới','Thế giới nhỏ Lạn Đà tự mở mỗi thời đại; liền với Ma Giới.',[1041,1064,1067],null,3],
    ['vung','Bắc Uông Dương','Vùng biển mênh mông; Phi Tiên giáo giáng lâm ở đây.',[1015,1574,1626],null,4],
    ['thanh','Trấn Thiên Hải Thành','Thành của Thủy tổ Hắc Long Vương, chia ba mạch.',[1,1574,1587],'Bắc Uông Dương',4],
    ['thanh','Minh Châu Thành','Thành chịu áp lực khi Phi Tiên giáo giáng lâm.',[1574],'Bắc Uông Dương',2],
    ['tong','Phi Tiên giáo','"Một môn Ngũ Đế", truyền thừa mạnh nhất Cửu Giới, từng chấp chưởng nhiều thời đại.',[1041,1054,1600],null,5],
    ['hiem','Tiên Ma Động','Nơi Lý Thất Dạ bị luyện thành Âm Nha.',[1,1639,1665],null,3]
  ],
  uthanh:[
    ['vung','Nam Diêu Vân','Vùng có Thiên Lý Hà; Lam Vận Trúc là đại mỹ nữ nổi danh.',[404],null,4],
    ['tong','Thiên Lý Hà','Truyền thừa của Lam Vận Trúc.',[404,417],'Nam Diêu Vân',3],
    ['vung','U Cương','Vùng có các đại giáo cương quốc, Phong Đô thành.',[417,430,456],null,4],
    ['thanh','Phong Đô thành','Quỷ thành; tin Dạ Hải biến trong truyền đi từ đây.',[424,456],'U Cương',3],
    ['hiem','Dạ Hải','Biển đen hung địa, chôn được cả Đại Hiền; chỉ câu được Dạ Dương Ngư.',[430,456,508],'U Cương',4],
    ['dao','Mê Thất Thần Đảo','Đảo khiến người của Tổ Thành kéo đến.',[521],null,2],
    ['thanh','Tổ Thành','Nơi chú mục nhất U Thánh giới, đại ngôn của Tổ giới ở hạ giới.',[521,599],null,5],
    ['hiem','Tổ Sơn','Núi đại biểu Vạn Cốt Hoàng Tọa.',[560],null,3]
  ],
  thachduoc:[
    ['vung','Dược Vực','Vực của dược sư; Dược quốc, Hoàng Phủ thế gia.',[625,651,690],null,4],
    ['vung','Thạch Vực','Vực đá.',[794],null,3],
    ['vung','Thú Vực','Vực yêu thú.',[794,820],null,3],
    ['quoc','Dược quốc','Thông gia với Hoàng Phủ thế gia; đầu hàng Lý Thất Dạ (ch.788).',[651,758,788],'Dược Vực',4],
    ['thanh','Dược thành','Thành giữa núi non, sinh cơ dạt dào.',[729],'Dược Vực',3],
    ['gia','Hoàng Phủ thế gia','Nhất lưu đại giáo cương quốc ở Dược Vực.',[651],'Dược Vực',3],
    ['quoc','Cự Trúc quốc','Có dược viên; Lý Thất Dạ giữ cho nó không ngã.',[625,646,690],'Dược Vực',2],
    ['quoc','Tào Quốc','Bị cuốn vào phong ba cùng Dược quốc, Tinh Hải giáo.',[742,755],null,3],
    ['hiem','Thiên Tùng Sơn','Núi có Thiên Tùng Thụ Tổ.',[690,742,885],null,3],
    ['tong','Tinh Hải giáo','Bị diệt (ch.907).',[742,907],null,3],
    ['tong','Đề Thiên Cốc','Lập phái sau khi Thần Thú Thiên Vực bị diệt.',[807,898],null,3],
    ['tong','Khô Thạch Viện','Có cửa đường tắt nối thẳng tới.',[794,911],null,3],
    ['hiem','Thần Thú Thiên Vực','Bị Hồng Thiên Nữ Đế đồ diệt.',[885,898],null,4],
    ['thanh','Bệ Ngạn thú thổ','Đất của Bệ Ngạn.',[833,867],'Thú Vực',2]
  ],
  thienlinh:[
    ['vung','Long Yêu Hải','Biển có Trầm Hải Thần Vương, Công Tôn hoàng hậu.',[1236,1288],null,4],
    ['vung','Cốt Hải','Biển xương; có Bạch Cốt đảo.',[1288,1301,1405],null,4],
    ['vung','Thần Chỉ Châu','Châu Lý Thất Dạ tới sau Bạch Cốt đảo.',[1405,1431],null,4],
    ['vung','Già Hải','Biển của Hải Yêu; Già Hải Thiên Tử bị đạp trọng thương.',[1457,1470],null,4],
    ['toc','Quảng Hải tộc','Chủng tộc ai cũng ngại dính vào.',[1197],null,3],
    ['toc','Thụ tộc','Chí cường giả ngang Tiên Đế; Thụ Tổ.',[1158,1379],null,4],
    ['tong','Cẩm Tú Cốc','Môn phái có tiên thảo.',[1171,1223],null,3],
    ['hiem','Khổng Tước Địa','Đáy biển, nơi Lý Thất Dạ xuất hiện.',[1171,1223],null,2],
    ['tong','Vô Cấu Tam Tông','Truyền thừa của Vô Cấu Tiên Đế.',[1197,1379],null,3],
    ['tong','Đế Vương Cốc','Lý Thất Dạ hẹn diệt sau.',[1314,1327],null,3],
    ['tong','Bất Tử Môn','Môn phái Lý Thất Dạ tới (ch.1428).',[1405,1428,1431],'Thần Chỉ Châu',3],
    ['thanh','Thiên Đằng thành','Chờ "khống đằng giả" nhiều năm.',[1176,1184],null,2]
  ],
  dethap:[
    ['vung','Thanh Châu','Chỗ cư trú lớn thứ hai của bách tộc.',[1756,1769],null,4],
    ['thanh','Tề Lâm thành','Thành khổng lồ của Tề Lâm Đế gia.',[1756,1769],'Thanh Châu',4],
    ['gia','Tề Lâm Đế gia','Có Tề Lâm Đế Nữ; định liên hôn Già Nhật Môn.',[1795,1821],'Thanh Châu',4],
    ['tong','Thiết Thụ Môn','Tiểu môn phái.',[1743,1756],null,1],
    ['tong','Già Nhật Môn','Có Thẩm Kim Long.',[1795,1808],null,2],
    ['quoc','Thiên Hoàng quốc','Bị "một phàm nhân" khiêu khích.',[1782,1834],null,3],
    ['thanh','Vực Ngoại Thiên Thành','Có Đông Cung thế gia, Bành gia.',[1830,1834],null,3],
    ['hiem','Cuồng Thần Hung Địa','Vùng hung địa.',[1795,1808],null,2],
    ['hiem','Viễn Hoang','Có Luân Hồi Hoang Tổ; Đại Đế Tiên Vương đứng ngoài xem.',[1912,1964],null,4],
    ['tong','Thiên Thần học viện','Có Nhân tông, Đế phủ, Thánh Viện; Lý Thất Dạ giảng bài.',[1996,2016,2047],null,4],
    ['tong','Tư Thần tông','"Một môn bốn Tiên Vương".',[2016],null,3]
  ],
  vanthong:[
    ['tong','Cuồng Đình','Đạo thống; Đại Kiếm Môn chỉ là nhánh cuối.',[2133,2159],null,4],
    ['tong','Đại Kiếm Môn','Môn phái xuống dốc của Chu Tư Tĩnh.',[2133],'Cuồng Đình',1],
    ['gia','Thượng Bộ Trần gia','Một trong bốn đại thế lực của Cuồng Đình đạo thống.',[2159],'Cuồng Đình',3],
    ['tong','Chu Tương Võ Đình','Quái vật khổng lồ ở Vạn Thống Giới.',[2211,2263],null,4],
    ['tong','Dương Minh giáo','Mạnh hơn Trường Sinh cốc.',[2211,2302],null,4],
    ['tong','Trường Sinh cốc','Giỏi đan, dược, y, độc; ít ai dám gây.',[2211,2237],null,3],
    ['quoc','Vạn Thọ quốc','Đến cầu thân.',[2237,2239],null,3],
    ['hiem','Hỏa Nguyên Chi Địa','Bảo địa, Trường Sinh cốc không quản hạt.',[2211,2224],null,3],
    ['hiem','Kim Tiền Lạc Địa','Giáng lâm Vạn Thống Giới, mở môn hộ.',[2289,2354],null,3]
  ],
  dethong:[
    ['hiem','Cửu Liên sơn','Dãy núi; Hồng Hoang sơn ở cực nam.',[2457,2458],null,3],
    ['hiem','Hồng Hoang sơn','Núi cao nhất cực nam, đối diện Hồng Hoang Thiên Lao.',[2458,2549],'Cửu Liên sơn',3],
    ['hiem','Hồng Hoang Thiên Lao','Thiên lao đối diện Hồng Hoang sơn.',[2458],null,3],
    ['thanh','Minh Lạc thành','Thành của Thạch Vận đạo thống.',[2575,2627],null,2],
    ['vung','Chúng Thần Quốc Độ','Do Lộc Khách Ông sáng lập.',[2614],null,3]
  ],
  tienthong:[
    ['tong','Quang Minh Thánh Viện','Thánh thổ đầy quang minh lực lượng.',[2796,2809],null,4],
    ['tong','Hộ Sơn tông','Tam lưu môn phái, Lý Thất Dạ là sư tổ.',[2718,2757],null,2],
    ['tong','Trung Vực thánh địa','Một trong hai thánh địa mạnh nhất Tiên Ma đạo thống.',[2757,2770],null,4],
    ['quoc','Bát Quái cổ quốc','Thánh địa cương quốc; đánh vào Hộ Sơn tông.',[2757,2783],null,4],
    ['tong','Y Điện','Nơi Linh Tâm Chân Đế xuất thân.',[2848],null,2],
    ['thanh','Thiên Hùng quan','Ở giữa Thiên Tiệm; biên hoang xa nhất Tiên Thống Giới.',[2913,2978],null,3],
    ['vung','Bất Độ Hải','Biển mênh mông vô tận bên trái Thiên Hùng quan.',[2913,2920,3134],null,5],
    ['vung','Thiên Khư','Hư không vô tận có nhật nguyệt chìm nổi.',[2913,3121],null,4]
  ],
  bactay:[
    ['tong','Thần Huyền tông','Nổi danh Tiên Cổ Cửu Pháp.',[3251,3264],null,4],
    ['vung','Thạch Nguyên','Vùng của Thạch Nhân tộc.',[3420],null,4],
    ['thanh','Tổ Thành','Trung tâm Thạch Nguyên, nhiều bán phản tổ nhất Bát Hoang.',[3420,3446],'Thạch Nguyên',5],
    ['tong','Âm Dương Thiền Môn','Có cổ tổ Thiền Dương Thiên Tôn.',[3394,3485,3498],null,4],
    ['tong','Khô Thạch Viện','Hiếm người ở Bát Hoang còn biết.',[3472],null,2]
  ],
  phatda:[
    ['tong','Vân Nê học viện','Viện trưởng Ngũ Sắc Thánh Tôn.',[3563,3641],null,4],
    ['tong','Thiên Long tự','Có Bàn Nhược Thánh Tăng.',[3563,3628],null,3],
    ['thanh','Phật Đế thành','Thành Phật Đế.',[3728],null,3],
    ['vung','Hắc Triều Hải','Biển đen đột biến chấn động mọi người.',[3836,3849,3864],null,5],
    ['quoc','Đông Man Bát Quốc','Có tồn tại chí cao vô thượng.',[3875,3901],null,4]
  ],
  kiemchau:[
    ['quoc','Hải Đế kiếm quốc','Do Đạm Hải Kiếm Hoàng chấp chưởng.',[4005,4203],null,5],
    ['quoc','Mộc Kiếm Thánh Quốc','Hoàng đế Liễu Kiếm Vương là một trong Kiếm Châu Lục Hoàng.',[4005,4044],null,4],
    ['tong','Bách Binh sơn','"Một môn song Đạo Quân".',[4057,4109],null,4],
    ['tong','Thiện Kiếm tông','"Một môn ba Đạo Quân" do Kiếm Đế khai sáng.',[4122],null,4],
    ['hiem','Táng Kiếm Vẫn Vực','Có thể là nơi xuất Hạo Hải Thiên Kiếm.',[4161,4162,4164],null,4],
    ['vung','Hạo Hải','Biển kiếm; Hạo Hải Thiên Kiếm.',[4161,4216],null,4],
    ['vung','Đông Kiếm Hải','Nơi ngũ đại cự đầu hỗn chiến vì Vạn Thế Đạo Kiếm.',[3979],null,3]
  ],
  thiencuong:[
    ['vung','Nam Hoang','Có Vạn Giáo Hội của tiểu môn phái.',[4330,4343],null,4],
    ['vung','Đông Hoang','Có Ngũ Dương Hoàng.',[4408,4434],null,4],
    ['tong','Tiểu Kim Cương môn','Tiểu môn phái Lý Thất Dạ làm môn chủ.',[4287,4291],'Nam Hoang',1],
    ['hiem','Vạn Giáo sơn','Nơi họp Vạn Giáo Hội.',[4313,4330],'Nam Hoang',3],
    ['vung','Phượng Địa','Một trong hai mạch đại yêu của Yêu Đô.',[4356,4369],null,3],
    ['vung','Toán Địa','Có Toán Địa đạo nhân.',[4486,4499],null,3],
    ['tong','Động Đình phường','Phường cổ trăm ngàn vạn năm.',[4486,4512],'Toán Địa',3]
  ],
  thaptam:[
    ['vung','Hạ Tam Châu','Có Bát Thất vương triều, Thần Chiếu quốc.',[4850,4902],null,5],
    ['quoc','Bát Thất vương triều','Do Bát Thất Đạo Quân sáng lập.',[4850],'Hạ Tam Châu',3],
    ['quoc','Thần Chiếu quốc','Thái hậu là Thiên Tôn Long Quân.',[4902],'Hạ Tam Châu',3],
    ['tong','Luân Hồi đạo','Của Thương Sơn Đế Quân.',[4928,5097],'Hạ Tam Châu',3],
    ['hiem','Mãng Hoang Thập Vạn Đại Sơn','Có Yêu Thần vị che chở.',[4980,4993],'Hạ Tam Châu',4],
    ['vung','Thượng Lưỡng Châu','Có tứ đại minh, Thương Lĩnh, Tịnh Thổ.',[4902,5500],null,5],
    ['vung','Lục Thiên Châu','Thanh Mộc Thần Đế bao trùm; có Vân Nê giới.',[4863,5357],null,5],
    ['vung','Tiên Chi Cổ Châu','Có Đế Dã.',[5071,5253],null,5],
    ['thanh','Thị Đế thành','Đế Môn chấp chưởng.',[5201,5240],null,4],
    ['tong','Tẩy Nhan Đế Tông','Có nguồn gốc sâu với Đế Dã.',[5232,5253],null,4]
  ],
  thiendinh:[
    ['vung','Đại Thế Cương','Do Đại Thế Đạo hóa thành.',[5565,5578],null,5],
    ['thanh','Đạo Thành','Lún xuống (ch.5741).',[5552,5741],null,4],
    ['hiem','Tịnh Thổ','Cổ xưa nhất Thượng Lưỡng Châu; Tu Di Phật Đế.',[5500,5760],null,4],
    ['hiem','Thương Lĩnh','Vẫn sừng sững giữa thiên địa.',[5461,5500],null,3]
  ],
  toigioi:[
    ['thanh','Phú Quý thành','Thành khổng lồ; Phú Quý Tiên Điện.',[5939,5994],null,4],
    ['tong','Cuồng Môn','Cổ thành nhỏ gần Phục Ngưu sơn.',[5955,5968],null,2],
    ['quoc','Trấn Tiên vương triều','Có Hoang Thần trấn thủ.',[5994,6150],null,4],
    ['tong','Đại Hoang Thiên Cương','Có Đại Hoang Nguyên Tổ.',[6228,6280],null,4],
    ['tong','Thần Chỉ Cương','Lấy Trường Tồn Viễn Đạo làm chủ.',[6228,6254],null,3],
    ['quoc','Tam Thánh Quốc','Nơi La Sát Ma Đế, Chiêm Hải Nguyên Tổ xuất thân.',[6254,6410],null,4],
    ['tong','Lan Thư Viện','Lan Thư Tứ Tiểu Thánh.',[6189,6215],null,2],
    ['hiem','Đại Đế Hoang','Nơi Đại Đế Hoang Thần.',[6007,6020],null,4],
    ['hiem','Thiên Tội Hải','Bị mộng cảnh bao phủ.',[6423,6436],null,4],
    ['hiem','Vạn Thi Hoang','Tử thi cấm địa có Tục Mệnh Thiền.',[6527,6761],null,4],
    ['hiem','Hắc Ám Quỷ Địa','Phía sau âm mưu cùng Biến Ma.',[6267,6709],null,4],
    ['hiem','Thục Địa','Có hai đại Tiên Nhân.',[6267,6709],null,4]
  ],
  thiencanh:[
    ['tong','Nguyên Thủy Thiên Hành','Thương hội cổ xưa nhất Thiên Cảnh.',[6904,7034],null,4],
    ['vung','Vô Tận Ám Giới','Nơi có manh mối về Thị Giới.',[6904,6912],null,5],
    ['vung','Cổ Chỉ Giới','Thế giới cổ xưa nhất còn lại.',[7034],null,4],
    ['vung','Dư Sinh Cảnh','Vạn Kiếp Tiên Nhân là chúa cứu thế.',[7073,7086],null,3],
    ['hiem','Ác Triệu Thiên','Mê vụ, rất khó thấy đường.',[7099],null,3],
    ['tong','Thiên Tể Tiên Cung','Tiên cung.',[7229,7242],null,4],
    ['hiem','Trí Hải','Biển trí.',[7216,7242],null,3],
    ['hiem','Vạn Kiếp Pháp Hải','Pháp Kiếp trốn về đây.',[7164,7203],null,3]
  ]
};
const st=STORIES.find(s=>s.id==='de-ba'),SZ=(window.SIZES&&SIZES['de-ba'])||{};
st.worlds.forEach(w=>{w.places=(PL[w.id]||[]).map(([t,n,d,ch,inn,s])=>({t,n,d,ch,in:inn||null,s:s||SZ[w.id+'|'+n]||2}))});
})();
