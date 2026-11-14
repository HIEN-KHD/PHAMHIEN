/* ===== Bất Diệt Võ Tôn — nhân vật, hành trình, công pháp & bảo vật ===== */
(function(){
const people=[
  ['gd','Cổ Phi','Nhân vật chính. Cô nhi tám tuổi vào Thái Huyền Môn, luyện thượng cổ Luyện Thể thuật bị chê rác rưởi; đắc bất diệt thể rồi đánh khắp các giới.',['danglong','nhangian','thiengioi','thuyto','thienthan'],[1,5,1003,4075]],
  ['gd','Cổ Tiểu Phong','Đồ tôn của Cổ Phi, tiểu béo đi cùng Tần Dao.',['thaithuy'],[4441]],
  ['dh','Lão Quy','Thái Hoàng chi tử, Yêu Chủ Yêu tộc Thiên giới, mang huyết mạch Chí Tôn; truyền đủ loại Yêu tộc đại pháp và dùng Thái Hoàng Ấn.',['thiengioi','nhangian','hoanggioi'],[1001,2641,2961]],
  ['dh','Đông Phương Thần','Người cùng thời ở Thái Huyền Môn; về sau mượn danh Cổ Phi xông Lạc Hà Môn.',['danglong'],[21,461]],
  ['dh','Đan Thần Tử','Cùng Cổ Phi vào Tiên Ma vực sâu.',['danglong'],[321]],
  ['dh','Phàm Tú tiểu hòa thượng','Một bàn tay đập chiến tướng vô địch của Bình Thiên thần triều vào đất.',['thaithuy'],[4421]],
  ['dh','Độc Cô Lão Nhân','Hỏi đường Cổ Phi khi hắn tới Tuyết Vực Triệu Gia.',['nhangian'],[2701]],
  ['hn','Huyền Minh Thánh Nữ','Cùng Cổ Phi tới trọng địa Kim Tinh Thần Viên bộ tộc.',['thiengioi'],[1081]],
  ['hn','Tần Dao','Đế nữ Tần Tộc.',['thienthan','thaithuy'],[4201,4441]],
  ['hn','Ma Tiên Nhi','Có Tiên Ma chi thể; độ Hóa Hình Lôi Kiếp ở Tiên Võ giới.',['tienvo'],[4021]],
  ['hn','Sở Uyển','Vừa đột phá Tiên Vương.',['tutien'],[6301]],
  ['hn','Ma Linh Nhi','Tân Ma Chủ của Ma tộc, dưới trướng tam đại ma tôn; muốn cùng Cổ Phi xông Tạo hóa chi địa.',['tutien'],[6704,6710,6718]],
  ['cg','Yêu Tổ','Hóa thân của vô thượng Nữ Đế trên đỉnh Đế Cực Ma Sơn; giáng lâm Bắc Hải, lái Phi Chu luyện từ Hồng Mông Thụ.',['tutien','dima'],[6702,6732,6737]],
  ['dh','Hỗn Độn Ma Hầu','Sinh từ Hỗn Độn, một gậy đánh ra vực sâu; bị một hóa thân Yêu Tổ nghiền ép, sau cùng đi chiến Ma Long.',['tutien'],[6711,6732,6876]],
  ['dt','Thanh Sư Yêu Chủ','Yêu Chủ duy nhất của Bắc Hải Yêu tộc buộc đối thủ phải nghiêm túc; bại trận.',['tutien'],[6721,6723,6724]],
  ['dt','Nguyên Cổ Tiên Đế','Chủ Thiên Đế Thành ở Thiên giới; có ba nửa bước đại năng dưới trướng.',['thiengioi'],[1061,1081]],
  ['dt','Cơ Phàm','Mang Vô Cực Thánh thể, tu vi ngang Cổ Phi; đối thủ cạnh tranh lớn nhất.',['nhangian'],[2261]],
  ['dt','Vương Dương','Đại thiếu Vương gia ở Thiên Thần giới, Cửu Dương Thần Thể; bị Cổ Phi một cước giẫm chết.',['thienthan'],[4081]],
  ['dt','Triệu Minh','Con trai độc nhất của Tiên Quân Triệu gia, Tiên Vương; gây sự với Cổ Phi.',['tutien'],[6301]],
  ['cg','Diệp Kinh Thần','Nam Châu Đao Đế, kẻ đáng sợ nhất Nam Châu.',['thuyto'],[3561]],
  ['cg','Liễu Ma','Một đời Ma Tôn được Thiên Ma Hồ mời ra.',['hoanggioi'],[3061]]
];
const journey=[
  [1,'danglong','Cô nhi Cổ Phi ở Thái Huyền Môn, tám năm luyện Luyện Thể thuật mới tới Thông Mạch.','tingnga'],
  [5,'danglong','Gặp nạn trong đầm, đắc bất diệt thể trong động quật.'],
  [7,'danglong','Nhận Thái Cực Âm Dương đồ.'],
  [241,'danglong','Lột xác cuối ở Tỉnh Ngã, bước vào Thoát Phàm.','thoatpham'],
  [244,'danglong','Phá toái hư không, vượt giới truyền tống.'],
  [321,'danglong','Vào Tiên Ma vực sâu cùng Đan Thần Tử.'],
  [401,'danglong','Đã là tu sĩ Ngự Hư khi còn rất trẻ.','nguhu'],
  [502,'danglong','Xuất phát vào sâu trong Tử vong thế giới.'],
  [515,'danglong','Bán Thần cảnh giới.','banthan'],
  [1003,'thiengioi','Lên Thiên giới: "lão tử rốt cuộc đã tới!"'],
  [1081,'thiengioi','Qua Huyền Minh 13 giới.'],
  [1521,'thiengioi','Đánh với Chuẩn Thánh.','chuanthanh'],
  [1567,'nhangian','Trở về Nhân Gian giới.'],
  [2084,'nhangian','Công phá Trung Châu Tiên Phủ.'],
  [2301,'nhangian','Độ Thánh Vương Kiếp.','thanhvuong'],
  [2385,'nhangian','Thống nhất hải ngoại tam đại châu.'],
  [2585,'nhangian','Trùng kích Thánh Tôn.','thanhton'],
  [2908,'nhangian','Vào di tích Cổ Thiên Đình.'],
  [2967,'hoanggioi','Tới Hoang giới, chấn động cả giới.'],
  [3318,'thuyto','Tới Tổ Thần Đại Lục.'],
  [3550,'thuyto','Tiến quân Trung Châu, rồi chinh chiến Nam Châu.'],
  [3841,'thuyto','Đứng trong tám đại Chí Tôn.','chiton'],
  [4021,'tienvo','Tới Tiên Võ giới, Đông Nhạc Thành.'],
  [4075,'tienvo','Độ phi thăng thần kiếp.'],
  [4081,'thienthan','Tới Thiên Thần giới, giẫm chết đại thiếu Vương gia.'],
  [4277,'thiengioi','Tái nhập Thiên giới.'],
  [4446,'thaithuy','Vào Thái Thủy giới.'],
  [4621,'thuyto','Thả thần niệm cấp vĩnh hằng tìm Thủy Tổ Ma Vực.','vinhhang'],
  [4658,'nguyenma','Giáng lâm Nguyên Ma giới.'],
  [5421,'vocuc','Phân thân nhập ngũ ở Vô Cực giới.'],
  [5861,'dima','Tới Dị Ma giới, thấy Nhân tộc thê thảm.'],
  [6238,'tutien','Tới thế giới tu tiên của Nhân tộc.'],
  [6401,'tutien','Một mình chiến ba lão tổ Tiên Quân Trần Gia.'],
  [6701,'tutien','Giữ Trấn Bắc Thành trước hải yêu Bắc Hải.'],
  [6714,'tutien','Trấn Bắc Thành bị Ma tộc phá; đập bay Hỗn Độn Ma Hầu.'],
  [6733,'tutien','Qua cửa đá vào Tạo hóa chi địa, chém dị thú vực sâu.'],
  [6888,'tutien','Phá hang ổ U Minh Ma tộc, cứu Tiểu Long Long.']
];
const arts=[
  ['cp','Thượng cổ Luyện Thể thuật','Bị chê là công pháp rác rưởi; tám năm mới qua cánh cửa thứ hai Thông Mạch.',[1]],
  ['hm','Bất diệt thể','Thể chất Cổ Phi đắc được trong động quật, gốc của tên truyện.',[5]],
  ['tt','Hỗn Độn che trời tay','Bàn tay Hỗn Độn che cả trời đất, bao trùm cả Độc Tôn Thành.',[2321,2861]],
  ['tt','Kiếm Hoàn Cửu Thiên Tinh Thần','Kiếm hoàn Cổ Phi hóa ra khi ngồi trên núi tổ địa Yêu tộc.',[4401]],
  ['bv','Thái Cực Âm Dương đồ','Bảo đồ xuất hiện ở ch.7.',[7]],
  ['bv','Sơn Hà đỉnh','Đỉnh Cổ Phi dùng luyện đan ở Long Cốc; nhiều Thần Hoàng tranh đoạt.',[761,841]],
  ['bv','Tam Giới Đăng','Đèn xuất hiện ở ch.481.',[481]],
  ['bv','Thái Hoàng Ấn','Ấn của Lão Quy, hóa thành người khổng lồ phát uy ở Tây Minh Hải.',[2641]],
  ['bv','Cổ tổ chiến giáp','Chiến giáp Cổ gia, Cổ Phi phát huy tới cực điểm khi đánh Mạch Chiến Cổ Tổ.',[5901]]
];
const st=STORIES.find(s=>s.id==='bat-diet-vo-ton');
st.people=people.map(([g,n,d,w,ch])=>({g,n,d,w,ch}));
st.journey=journey.map(([ch,w,d,r])=>({ch,w,d,r:r||null}));
st.arts=arts.map(([g,n,d,ch,rank])=>({g,n,d,ch,rank:rank||null}));
})();
