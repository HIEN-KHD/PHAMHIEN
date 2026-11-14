/* ===== Cửu Tinh Bá Thể Quyết — nhân vật, hành trình, công pháp & bảo vật (từ chương 3276–7204) ===== */
(function(){
const people=[
  ['gd','Long Trần','Nhân vật chính. Cửu Tinh truyền nhân, luyện đan sư, phân viện viện trưởng Lăng Tiêu Thư Viện; lập Long huyết quân đoàn.',['colan','tuviem','minhhao','nietdoanh','thienhoang','tuhuyet','thienvuc','thienthinh'],[3276,3556,3716,7196]],
  ['gd','Long Chiến Thiên','Cha Long Trần; nhờ Thất Thải Chí Tôn huyết phá gông cùm thần hỏa, về sau sát nhập cao tầng Long gia.',['nietdoanh','thienhoang'],[4296,4716,4956]],
  ['gd','Lạc Tử Xuyên','Ngoại công Long Trần, người Lạc gia của Tử Huyết nhất mạch; đứng về phía Long Trần.',['tuhuyet'],[5796]],
  ['hn','Mộng Kỳ','Hồng nhan của Long Trần, cho phép hắn "phụng chỉ tán gái".',['minhhao','tuhuyet'],[3916,3936,5856]],
  ['hn','Bạch Thi Thi','Đồng hành từ thư viện, theo Long Trần ở Thiên Hồng vực, Long Vực.',['colan','minhhao','longvuc'],[3276,3296,3916,5456]],
  ['hn','Dư Thanh Tuyền','Báo cho Long Trần thời gian thiên hỏa thế giới giáng xuống.',['tuviem','minhhao'],[3516,3536,3916]],
  ['hn','Đường Uyển Nhi','Ngưng tụ mười đầu thiên mạch long khí — vượt cả "chín là cực" trước Nhân Hoàng.',['phongthan','thienmach'],[5316,5356,5656]],
  ['hn','Tử Yên','Người cùng Long Trần từ Thiên Võ Đại Lục; đi cùng hắn ở Thiên Thịnh Thần Châu.',['thienvo','thienthinh'],[6536,7076,7116]],
  ['hn','Đông Minh Ngọc','Sát thủ, truyền thừa y bát Ân Phổ Đạt ở phàm giới, ở Tiên Giới bái Dạ Vô Thanh làm sư.',['tuviem','thienvuc'],[3896,3916,6476]],
  ['hn','Phượng Phỉ','Cùng Long Trần phi thăng từ phàm giới; bị Long Khải Hoa một kiếm làm tổn Bản Nguyên.',['thienhoang','thienvo'],[5016,5036,6176]],
  ['dh','Quách Nhiên','Huynh đệ, thiên tài đúc khí (Ma Long chiến giáp); "Long huyết quân đoàn đệ nhất nhân".',['tuviem','minhhao','nietdoanh'],[3576,3676,3876,4156]],
  ['dh','Hạ Thần','Huynh đệ, cao thủ trận pháp; suýt diệt sạch Linh Văn Các.',['tuviem','minhhao'],[3656,3676,3878,5956]],
  ['dh','Bạch Tiểu Nhạc','Dùng Không Gian Chi Lực; linh hồn từng trọng thương ở Thiên Hồng vực.',['colan','nietdoanh'],[3276,3296,3456]],
  ['dh','Mặc Niệm','Bạn đồng hành ồn ào, cuồng ngạo "duy ngã Mặc Niệm"; lấy được chí bảo ở Thiên Mạch Huyền Cảnh.',['tuviem','thienmach'],[3696,3796,5556,5716]],
  ['dh','Lôi Linh Nhi','Tiểu linh sấm sét đi theo Long Trần; về sau thức tỉnh Pháp Thiên Tượng Địa.',['tuviem','thienthinh'],[3756,4336,7136]],
  ['dh','Hỏa Linh Nhi','Tiểu linh lửa, thức tỉnh ở Thanh Vũ thành, nuốt Viêm Hư chi diễm.',['tuviem','thienvuc'],[3576,3736,6389]],
  ['dh','Long Tam gia','Kẻ lớn lối "vô pháp vô thiên", luôn khiến đối thủ tức hộc máu.',['tuviem','longvuc','hondon'],[3496,5456,6356]],
  ['dh','Cốc Dương','Chiến sĩ Long huyết, khí huyết cuồng bạo.',['thienmach','tuhuyet'],[3916,5676,6496]],
  ['dh','A Man','Người Man tộc thân với Long Trần.',['colan','thienmach'],[3276,4251,5656]],
  ['dh','Tịnh Viện đại nhân','Bề trên của thư viện, ủng hộ và dạy Long Trần khôi phục lực lượng tinh thần.',['minhhao','thienvuc'],[4276,6576,6616]],
  ['dt','Đại Phạm Thiên','Kẻ giám thị và săn giết Cửu Tinh truyền nhân khắp cửu thiên thập địa; tín đồ đập tượng Thiên Hồng Tiên Tử.',['colan','tamlinh','thienvuc'],[3336,3416,4416]],
  ['dt','Minh Long Thiên Chiếu','Thiên Kiêu Minh Long nhất tộc, được Thiên Đạo trợ giúp chống Long Trần.',['longvuc'],[4436,4456,4583]],
  ['dt','Cơ Vô Mệnh','Cao thủ sát thủ; chỉ Đông Minh Ngọc mới đánh được một trận.',['tuviem'],[3836,3894,3896]],
  ['dt','Long Thiên Nhị','Tuyệt thế Thiên Kiêu Long gia, quái vật phong ấn từ Thượng Cổ.',['thienhoang','thienthinh'],[4781,4956,7056]],
  ['dt','Long Bích Lạc','Có Đế diễm nhiều hơn Côn Vô Thiên một đạo, cầm Thần Đế Pháp Khí.',['thienvuc'],[6176,6216,6236]],
  ['dt','Long Xán','Tam tượng Thần Đế, một trong bát đại thần huy; bị Long Trần chém.',['tuhuyet','thienvuc','thienthinh'],[5916,6616,7096]],
  ['dt','Phong Hành Liệt','Thiên Kiêu Tề Thiên Đạo Tông; Long Trần không thèm giết.',['thienthinh'],[7196,7200,7203]],
  ['cg','Thiên Hồng Tiên Tử','Hy sinh để thủ hộ Nhân tộc; tàn hồn tiêu tán khi tượng bị đập.',['colan'],[3316,3336]],
  ['cg','Liễu Trường Thiên','Đế Quân, nói "thời gian không còn nhiều" như giọng nói thần bí.',['tuhuyet'],[5876,5916]],
  ['cg','Bạch Nhạc Thiên','Viện trưởng Lăng Tiêu Thư Viện, cầm Lăng Tiêu Thần Kiếm.',['minhhao'],[3716,4796]],
  ['cg','Lý Thương Hạo','Cung chủ Tinh Hà cung, Chưởng Khống Giả cao nhất.',['thienthinh'],[6676,6716]]
];
const PEOPLE_GROUPS={gd:'Gia đình',hn:'Hồng nhan',dh:'Đồng hành',dt:'Đối thủ',cg:'Cường giả'};
const journey=[
  [3276,'colan','Ở tứ Cực Cảnh, một cái tát đánh gục thủ lĩnh Thanh Long Bang.','tucuc'],
  [3336,'colan','Thiên Hồng Tiên Tử vẫn lạc; Long Trần thề giết tín đồ Đại Phạm Thiên.'],
  [3376,'colan','Lên tứ cực thập trọng thiên.'],
  [3436,'colan','Độ kiếp, tiến giai Thần Quân cảnh; ngưng ngôi sao thứ bảy Tử khuyết (ch.3416).','thanquan'],
  [3476,'tuviem','Lặng lẽ rời đi, qua Thiên Diễn tinh vực tới Tân Hải Tinh Vực, lên thuyền đi Tử Viêm Thiên.'],
  [3636,'tuviem','Rời Ma La Tinh Vực, nơi dân coi hắn là Vương.'],
  [3676,'tuviem','Thần Quân thập trọng thiên; phá Cửu U đảo.'],
  [3916,'minhhao','Đoạt Ngũ Hành Kỳ của Long Ngạo Thiên, một kích giết U Mục Cự Nhân.'],
  [4036,'tuviem','Giết Cửu U điện chủ Liêu Bản Thương, phá cân bằng Minh giới chi môn.'],
  [4096,'nietdoanh','Hoành độ Thiên Hà tới Niết Doanh Thiên, giúp Vọng Nguyệt nhất tộc.'],
  [4296,'nietdoanh','Thất Thải Chí Tôn huyết nhập thể; cha Long Chiến Thiên đột phá.'],
  [4376,'nietdoanh','Đánh lui Vô Nhân Giới trước cự môn.'],
  [4456,'longvuc','Giới Vương ngũ trọng lên lục trọng thiên khi đối đầu Minh Long Thiên Chiếu.','gioivuong'],
  [4496,'minhhao','Thoát qua Cửu Thiên đại môn, trở về Minh Hạo Thiên.'],
  [4596,'tamlinh','Qua Tam Linh giới lúc vạn đạo thức tỉnh.'],
  [4696,'minhhao','Vương Giả trở về, tàn sát Thiên Kiêu trước Cửu Thiên chi môn.'],
  [4956,'thienhoang','Tới Thiên Hoang, đụng độ Long Thiên Nhị của Long gia.'],
  [5176,'minhhao','Vừa tiến giai Bất Hủ, về Lạc Hà thành gần Lăng Tiêu Thư Viện.','bathu'],
  [5236,'longvuc','Xông vào Long Vực.'],
  [5316,'phongthan','Đoạt quán quân tuyển chọn ngoại vực ở Phong Thần Hải Các.'],
  [5496,'minhgioi','Kháng Minh hoàng.'],
  [5556,'thienmach','Vào Thiên Mạch Huyền Cảnh.'],
  [5796,'tuhuyet','Dẫn người giết lên Tất gia, được ngoại công ủng hộ.'],
  [5956,'tuhuyet','Dồn sức chuẩn bị Thiên Kiếp để tiến giai Nhân Hoàng.','nhanhoang'],
  [5976,'tuhuyet','Lên Đế Sơn, bại Đế Quân (ch.5974).'],
  [6196,'thienvuc','Thiên Vực chiến trường mở.'],
  [6556,'thienvuc','Hủy Phạm Thiên Thánh Địa.'],
  [6616,'thienvuc','Vừa tiến cấp Đế Quân đã chém Thần Đế.','dequan'],
  [6656,'thienthinh','Vào Tinh Hà cung cùng các đệ tử mới từ Cửu Thiên.'],
  [6876,'thienthinh','Danh tiếng lan khắp Thiên Thịnh Thần Châu.'],
  [7096,'thienthinh','Chém tam tượng Thần Đế Long Xán.'],
  [7196,'thienthinh','Tới Tề Thiên Đạo Tông đòi công đạo.']
];
const arts=[
  ['cp','Cửu Tinh Bá Thể Quyết','Công pháp chính; tu luyện theo chín ngôi sao, Thập tự Diệt Thần trong đó kích hoạt Đế Huyết Ấn.',[3416,5476]],
  ['cp','Tử khuyết tinh','Ngôi sao thứ bảy, ngưng tụ khi Long Trần vào Thần Quân; cần tới Tiên Vương mới hóa tinh cửu biến.',[3416,3676]],
  ['tt','Khai Thiên','Đao pháp mạnh nhất của Long Trần; Khai Thiên đệ nhị thức.',[3296,3356,3467]],
  ['tt','Thập tự Diệt Thần','Luyện thành huyết mạch thần thông; tăng khả năng khống chế lực lượng.',[4996,5016]],
  ['tt','Long Huyết Thập Tự Trảm','Hợp kích của Long huyết quân đoàn do Hạ Thần, Quách Nhiên nghiên cứu.',[5676,5956]],
  ['tt','Tam hoa đồng tử','Đồng tử ở mắt trái Long Trần.',[3336,3856,4336]],
  ['tt','Côn Bằng vũ dực','Đôi cánh vàng tốc độ cực nhanh, Long Trần khu động bằng các loại huyết.',[4076,4316,4596]],
  ['hm','Thất Thải Chí Tôn huyết','Huyết tự lao vào Long Trần; một lọ giúp Long Chiến Thiên phá gông cùm.',[4296,4316,4976]],
  ['hm','Tử Huyết','Tinh huyết của Tử Huyết nhất tộc, dịu nhất trong ba loại huyết của Long Trần.',[4316,4996]],
  ['hm','Long huyết','Huyết của Long Trần và Long huyết quân đoàn.',[4316,4976]],
  ['tt','Bản Mệnh Thần phù','Phải ngưng tụ hoàn chỉnh để tiến giai Đế Quân.',[6476,6496,6576]],
  ['tt','Đế diễm','Ngọn lửa đế đạo; Long Bích Lạc có 693 đạo.',[6016,6236,6276,6306]],
  ['bv','Đỉnh Càn Khôn','Đỉnh luyện đan thân thể cực chắc; cường giả khắp nơi kéo tới vì nó.',[4076,4176,6216]],
  ['bv','Long cốt Tà Nguyệt','Binh khí Long Trần vác trên vai.',[4647,4696,4716]],
  ['bv','Thiên Đạo thụ · Thiên Đạo quả','Cây cướp cả Bản Nguyên Đế Quân ngưng quả; quả biến người thành Thiên Kiêu cấp Chí Tôn.',[3796,5956,6396]],
  ['bv','Thiên Hồng Thải Diễm','Ngọn lửa bảy màu của Thiên Hồng Tiên Tử.',[3316,3336]],
  ['bv','Ma Nhãn Thụy Liên','Sen ma nhãn có thần thông không gian đồng thuật.',[3292,3296,4636]],
  ['bv','Phù Tang cổ mộc · Thái Âm chi mộc','Hai cây thần trong thế giới hỗn độn của Long Trần.',[3836,5576,6636]],
  ['bv','Lăng Tiêu Thần Kiếm','Kiếm của viện trưởng Bạch Nhạc Thiên.',[3716,4796]],
  ['bv','Bát Hoang Phục Ma Thương','Thương của Long Bích Lạc.',[6216]]
];
const ARTS_GROUPS={cp:'Công pháp',tt:'Thần thông',hm:'Huyết mạch',bv:'Bảo vật'};
const st=STORIES.find(s=>s.id==='cuu-tinh-ba-the-quyet');
st.people=people.map(([g,n,d,w,ch])=>({g,n,d,w,ch}));
st.journey=journey.map(([ch,w,d,r])=>({ch,w,d,r:r||null}));
st.arts=arts.map(([g,n,d,ch,rank])=>({g,n,d,ch,rank:rank||null}));
st.peopleGroups=PEOPLE_GROUPS;st.artsGroups=ARTS_GROUPS;
})();
