/* ===== Bạo Lực Đan Tôn — địa danh của từng thế giới =====
   Mỗi mục: [loại, tên, mô tả, [chương], thuộc, quy mô 1–5]. Gán vào thế giới theo khoảng chương — có thể nhầm, báo để sửa. */
(function(){
const PL={
  phongvan:[
    ['quoc','Thích Phong đế quốc','Một trong tam đại đế quốc; cho phép chiêu mộ tư binh theo cấp bậc.',[4,10,185,640],null,5],
    ['quoc','Băng Tuyết đế quốc','Đế quốc có Liệt Thiên Phù Vương làm khách ở Thích Phong.',[185,465,500],null,4],
    ['quoc','Hắc Ám đế quốc','Đế quốc gắn với Ám Thần Điện và hắc ám thiên ma.',[605,660],null,4],
    ['quoc','Arthur vương quốc','Vương quốc có Arthur vương thành, Hãn Tướng thành, Loạn Chi thành.',[45,395],null,3],
    ['thanh','Dương Thành','Nơi Trần Huyền trọng sinh, trong Địa Sát bảo vệ đoàn hộ tống con gái thành chủ.',[1],'Thích Phong đế quốc',2],
    ['thanh','Bắc Thủy thành','Thành đầu tiên Trần Huyền dừng chân; có Diệp gia, thành chủ phủ "huyết đêm".',[2,5,10,80],'Thích Phong đế quốc',3],
    ['thanh','Thượng Quan thành','Thượng Quan gia tộc là "hoàng đế thật sự" của thành.',[150,255],'Thích Phong đế quốc',3],
    ['gia','Thượng Quan gia tộc','Gia tộc coi tên Trần Huyền là cấm từ.',[117,150,640],'Thích Phong đế quốc',3],
    ['thanh','Liêu Bắc thành','Quanh thành có tam đại tông môn, mạnh nhất Bại Huyết tông.',[255],'Thích Phong đế quốc',2],
    ['tong','Bại Huyết tông','Tông mạnh nhất quanh Liêu Bắc thành.',[255],'Thích Phong đế quốc',3],
    ['tong','Vô Tâm Môn','Môn phái của Mộc Nhẹ Toàn.',[80],null,2],
    ['tong','Tinh Thần Sơn','Thế lực có nhiều đệ tử; đi cùng Giang Vô Danh.',[325,430],null,4],
    ['tong','Cuồng Đế Môn','Môn phái có tổng bộ Trần Huyền đi tìm.',[465],'Băng Tuyết đế quốc',3],
    ['tong','Trân Bảo Các','Nơi buôn bán; kẻ gây sự bị thành chủ ra tay.',[675],null,2],
    ['tong','Ám Thần Điện','Có các phó điện chủ; Trần Huyền lực chiến hai đại phó điện chủ.',[605],'Hắc Ám đế quốc',4],
    ['tong','Bắc Hải Thần Điện','Thần điện của cường giả thành thần trên Bắc Hải; dẫn vào Vô Cực Giới.',[326],null,4],
    ['toc','Hồ tộc','Bộ lạc ngoài thành Phá Lan.',[360],null,2]
  ],
  vocuc:[
    ['hiem','Vô Cực Giới','Thế giới của Thần cấp cường giả trong Bắc Hải Thần Điện.',[326,336,428],null,4],
    ['tong','Mời Nguyệt lâu','Lâu chủ kinh hãi trước Trần Huyền.',[251,425,430],null,3]
  ],
  tuchan:[
    ['tong','Chính đạo liên minh','Liên minh dùng đá triệu hồi tu sĩ.',[807],null,4],
    ['tong','Bạch Cốt tông','Tu sĩ dùng gậy xương lớn; Trần Huyền gặp khi vừa xuống Tu chân giới.',[807,815],null,3],
    ['tong','Ô Linh tông','Tông nhị lưu, mở Ô Linh dược phòng.',[850],null,2],
    ['tong','Cổ Dược tông','Tông luyện dược mời bằng hữu thiên hạ.',[920,955],null,3],
    ['tong','Tà Đan tông','Ngóc đầu trở lại sau tranh đấu 5 năm trước.',[955],null,3],
    ['tong','Cửu Cung các','Nơi diễn ra cuộc thi kịch liệt.',[1060,1130],null,3],
    ['toc','Dược tộc','Có dược trì — nơi mạo hiểm giá trị nhất của tộc.',[1305],null,3],
    ['tong','Pháp Diệu tông','Liên quan Ngô Tử Công ở Bông Tuyết thành.',[1340],null,2],
    ['thanh','Bông Tuyết thành','Thành của Ngô Tử Công.',[1340],null,2],
    ['thanh','Đế Hư thành','Thành chủ phái người tới cánh đồng hoang; Trần Huyền làm lĩnh chủ thành phụ thuộc.',[1375],null,3],
    ['dao','Long Thánh đảo','Đảo rơi xuống biển; cao thủ Nguyên Anh bố trận giữ đảo.',[833],null,3],
    ['toc','Hắc Long tộc','Tộc có tộc trưởng Âm Châm.',[747,780],null,3]
  ],
  namphong:[
    ['vung','Thiên Vực','Vực của lão giả truy đuổi Cừu Như Sương.',[1441],null,4],
    ['vung','Nam Phong vực','Vực có Thiên Ma Môn; trời sao giống trời Nam Phong vực.',[1441,1480],null,4],
    ['vung','Hàn vực','Vực nhắc cùng Nam Phong vực.',[1480],null,3],
    ['tong','Thiên Ma Môn','Môn chủ Thù Vạn Dặm; con trai mang "thần ma chi mắt".',[1441],'Nam Phong vực',3],
    ['tong','Thiên Linh tông','Tông của Trần Huyền, có Thanh Trần tông bên trên.',[1442,1445],null,3],
    ['tong','Thanh Trần tông','Trần Huyền trở lại ở ch.1445.',[1445],null,3],
    ['tong','Thần Tâm môn','Môn phái quanh Dương Vân sơn.',[1515],null,2],
    ['hiem','Dương Vân sơn','Nơi Trần Huyền "tới nguyên bản".',[1515],null,2]
  ],
  gialam:[
    ['vung','Tầm Thành','Tên gọi chung của cả thế giới này, không phải một tòa thành.',[1550,1585],null,4],
    ['tong','Tam Bạch môn','Môn phái của Tam Bạch tiên sinh, hậu thiên cảnh.',[1550,1585],'Tầm Thành',3],
    ['hiem','Già Lam kiếm vực','Nơi thí luyện; không dùng được Già Lam Kiếm.',[1620],null,4],
    ['tong','Hợp Quy tông','Một trong thượng tam tông; luyện đệ tử bằng cực hạn bức bách.',[1651,1655,1680],null,4],
    ['thanh','Ngũ Phương trấn','Trấn chỉ có hai danh ngạch vào Hợp Quy tông.',[1651],null,1],
    ['tong','Vũ tông','Một trong tám đại tông.',[1690],null,3]
  ],
  daotam:[
    ['hiem','Tím La sơn','Nơi tà môn, tu luyện giả Võ Đạo đại lục đều tránh; sư phụ Trần Huyền chọn làm nơi tu.',[1760],null,4],
    ['hiem','Mật Chi Sâm','Rừng cách biệt; Trần Huyền tu ba năm ở đây.',[1830,1839],null,3],
    ['thanh','Thiên Huyền thành','Nơi luận bàn bí mật thượng giới.',[2025],null,3],
    ['thanh','Bạch Mạc thành','Thành có trận chiến kịch liệt.',[2005],null,2],
    ['thanh','Thiên Phong thành','Thành nơi chuẩn bị chiến.',[2040,2110],null,2],
    ['tong','Tuyết Sơn tông','Tông ở Đạo Tâm đại lục.',[1795,1839],null,2],
    ['tong','Thiên Cơ các','Tông môn thần bí.',[2075],null,2]
  ],
  hacnham:[
    ['quoc','Vân Diệp đế quốc','Đế quốc có Vân Diệp thành, Vân Diệp môn.',[2705,3055,3160,3335],null,5],
    ['quoc','Long Huyết đế quốc','Đế quốc của Kiếm Nguyệt tông, Huyết Ma tông, Long Văn tông.',[3055,3405,3580,3720],null,5],
    ['quoc','Ma Phong đế quốc','Đế quốc của Hoàng Huyền Cương, Ma Linh tông.',[2950,3440,3930],null,4],
    ['quoc','Thu Sương quốc','Quốc gia cạnh Hắc Nham thành.',[2530,3860],null,2],
    ['thanh','Hắc Nham thành','Thành đầu tiên, có y quán mạnh nhất thành.',[2473,2495],null,3],
    ['hiem','Hắc Nham rừng rậm','Rừng ma thú nguy hiểm.',[2320,2355],null,3],
    ['tong','Vạn Thần điện','Thế lực lớn xuyên suốt nhiều khu.',[2495,2530,2775,2845],null,4],
    ['thanh','Lục Vũ thành','Có Thiên Nguyên điện, Lưu gia.',[2565,2705,2775],'Vân Diệp đế quốc',3],
    ['tong','Vân Diệp môn','Trần Huyền làm đệ tử, dẫn lửa bay qua.',[2600,2705],'Vân Diệp đế quốc',3],
    ['thanh','Vân Diệp thành','Tổ chức luận võ lớn.',[2985],'Vân Diệp đế quốc',3],
    ['tong','Quá Hư sơn trang','Sơn trang trang chủ thần vương sáu trọng.',[3020],null,2],
    ['tong','Vạn Kiếm sơn trang','Trần Huyền lên làm trang chủ.',[3020,3540],null,3],
    ['thanh','Thiên Long thành','Thành có Hắc Huyết tông, Trương tộc.',[3230,3265,3405],'Long Huyết đế quốc',4],
    ['tong','Kiếm Nguyệt tông','Tông Trần Huyền quay về.',[3615,3685,4070],'Long Huyết đế quốc',4],
    ['tong','Huyết Ma tông','Kẻ thù lớn; Trần Huyền giết hộ pháp Tư Đồ.',[3685,3720,3930,4210],'Long Huyết đế quốc',4],
    ['tong','Long Văn tông','Tông của tông sư long văn Kiều Lập Tiếu.',[3580,3615],'Long Huyết đế quốc',3],
    ['tong','Lăng Không tông','Xếp hạng sau Kiếm Nguyệt tông một chút.',[4070],null,3],
    ['tong','Xà Thần giáo','Triệu Chí Vân cầm đầu, tu vi thần hồn.',[3860],null,3],
    ['tong','Thiên Thương phái','Đệ tử vào Hỏa bí mật lâm.',[4245],null,3],
    ['tong','Nhạn Kiếm phái','Tham gia bảng xếp hạng Lôi Châu; coi trọng Trần Huyền.',[4350,4474],null,3],
    ['thanh','Thu Vân thành','Có Thiên Hổ tông, Long Vệ thành.',[4420],null,3]
  ],
  vanthanh:[
    ['vung','Đông vực','Vực yếu nhất của Hắc Nham thế giới, nơi Trần Huyền xuất thân.',[4595,4599],null,3],
    ['vung','Trung bộ khu vực','Nơi thiên tài các khu tụ về.',[4599],null,4],
    ['tong','Viêm Long môn','Có Cửu Long tháp.',[4665],null,3],
    ['hiem','Cửu Long tháp','Trần Huyền tu Cửu Long viêm hồn kiếm pháp.',[4665],null,2],
    ['tong','Đốt Thiên môn','Môn chủ và đại trưởng lão Nội Các kinh ngạc về Trần Huyền.',[4700],null,3],
    ['hiem','Thất Viêm bí cảnh','Bí cảnh tên chương.',[4735],null,2],
    ['tong','La Long môn','Ở Cửu Lôi bí cảnh cùng Thiên Sát môn.',[4770],null,3],
    ['hiem','Cửu Lôi bí cảnh','Bí cảnh có Long Yêu tộc.',[4770],null,2]
  ],
  thanhtien:[
    ['tong','Long Băng môn','Môn chủ có pháp bảo Thiên Huyền long giới.',[4805,4943],null,4],
    ['vung','Long Mật vực','Vực có tông cấp tiên.',[4840],null,3],
    ['tong','Kiếm Hồn phái','Có đại trưởng lão; xung đột Long Tiên môn.',[4875],null,3],
    ['tong','Long Tiên môn','Nội môn trưởng lão tức giận tới tận nơi.',[4875,5015],null,3],
    ['tong','Nước Trong tông','Cướp thiên thủy mạch.',[4945],null,3],
    ['tong','Tiên Long điện','Yêu Vương tối cao là thần tôn cảnh giới.',[4943,4980],null,4],
    ['vung','Trung Vực đại lục cuồn cuộn','Nơi xé rách không gian; ma vệ bị Vạn Tiên đại lục lưu đày.',[5020],null,3]
  ],
  vantien:[
    ['tong','Huyết Tiên môn','Tông chủ sắp xuất hiện, các phe liên hợp chống.',[5085],null,4],
    ['tong','Yêu Long tông','Môn phái mạnh Trần Huyền tiếp xúc khi mới vào.',[5046,5050],null,3],
    ['tong','Khi Tiên tông','Tông phòng bị Trần Huyền.',[5155,5330],null,3],
    ['tong','Long Hoa Thế tông','Tông chủ giằng co với Tống Thật Sơ.',[5190],null,3],
    ['tong','Ma Huyết Long tông','Có trận pháp ma huyết.',[5295,'~5525'],null,4],
    ['tong','Ngàn Tiên La tông','Võ giả mặc phục riêng.',['~5770'],null,3],
    ['tong','Thanh Vân tiên môn','Một trong mười đại tiên tầng.',['~5945','~5980','~6050'],null,4],
    ['tong','Tiên Ma Kiếm Vân phái','Phô bày tu vi mạnh.',['~6015'],null,3],
    ['hiem','Hắc Thủy pháp giới','Pháp giới có không gian ngoại phóng.',['~6015','~6050'],null,3],
    ['vung','Vạn Lôi Kim Phong khu vực','Khu vực có tên chương.',['~6085'],null,2]
  ],
  thienvuc:[
    ['vung','Tiên Lân thiên vực','Tiên vực độc lập; vực chủ chấn động vì Trần Huyền.',['~6126','~6137'],null,4],
    ['vung','Bạch Long thiên vực','Có pháp bảo thương hội.',['~6295','~6302'],null,3],
    ['vung','Thần Tuyết thiên vực','Có vực chủ riêng.',['~6333','~6335'],null,3],
    ['vung','Diệt Ma thiên vực','Vực chủ chết ở ch.6390.',[6383,6390],null,3],
    ['vung','Phía Đông tổng Thiên Vực','Liên minh phía đông.',[6365,6380],null,4],
    ['hiem','Cổ Hoàng Long sa mạc','Sa mạc biến đổi kỳ quái, yêu thú bộc phát.',[6380],null,3],
    ['tong','Huyễn Kiếm Long minh','Lo cho Trần Huyền khi vực chủ xuất hiện.',['~6125'],null,3],
    ['tong','Long Thần Ma tông','Từng bị diệt, nay xuất hiện lại.',[6415],null,3],
    ['hiem','Thiên Hoa tiên sơn','Ở khu vực xa về phía tây.',[6415],null,2]
  ],
  trungvuc:[
    ['hiem','Long Tô rừng rậm','Dải đất thần bí; Yêu Vương hỏa diễm mãnh hổ.',[6423],null,3],
    ['tong','Long Thần tông','Đệ tử bị ma tông tấn công.',[6625],null,3],
    ['tong','Diễm tông','Có Sư Hoàng; đối đầu Ma Môn của U Ảnh Thần Đế.',[6555],null,3],
    ['tong','Tinh Long tông','Nơi Trần Huyền tu luyện cuối truyện.',[6800,6835],null,3],
    ['hiem','Già La sơn mạch','Dãy núi thần bí Trần Huyền dò xét.',[6870],null,2]
  ],
  tinhkhong:[
    ['hiem','Ngôi sao chi cảnh','Cảnh giới/không gian sao Trần Huyền dung nhập.',[6905,6917],null,4],
    ['hiem','Thiên Đạo tinh không bí cảnh','Bí cảnh.',[6375],null,3]
  ]
};
const st=STORIES.find(s=>s.id==='bao-luc-dan-ton'),SZ=(window.SIZES&&SIZES['bao-luc-dan-ton'])||{};
st.worlds.forEach(w=>{w.places=(PL[w.id]||[]).map(([t,n,d,ch,inn,s])=>({t,n,d,ch,in:inn||null,s:s||SZ[w.id+'|'+n]||2}))});
})();
