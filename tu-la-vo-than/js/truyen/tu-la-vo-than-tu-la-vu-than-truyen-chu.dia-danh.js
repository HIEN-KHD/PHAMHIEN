/* ===== Tu La Võ Thần — địa danh của từng thế giới =====
   Mỗi mục: [loại, tên, mô tả, [chương], thuộc, quy mô 1–5] */
(function(){
const PL={
  cuuchau:[
    ['vung','Thanh Châu','Châu nơi cửu sắc thần lôi giáng xuống; tông môn mọc lên san sát.',[1,131,221],null,4],
    ['quoc','Khương thị hoàng triều','Hoàng triều đứng đầu Cửu Châu; các lão tổ xin hoàng triều đánh Sở Phong.',[341,431,521],null,5],
    ['tong','Thanh Long tông','Tông của Sở Phong ở Thanh Long dãy núi, Thanh Châu.',[1,81,131],'Thanh Châu',4],
    ['tong','Giới linh công hội','Thế lực giới linh sư, chiếm Tu La Quỷ Tháp nhiều năm.',[191,461,491],null,4],
    ['tong','Hỏa Thần Môn','Bị Sở Phong và Tử Linh đại náo, đào cả mộ tổ.',[431],null,3],
    ['tong','Hư Không Tông','Tông bị hỏa diễm vây, giới linh sư áo lam dựng kết giới chặn.',[491],null,3],
    ['tong','Lăng Vân tông','Tông môn ở Cửu Châu.',[101,131],null,2],
    ['tong','Bạch Hổ Sơn Trang','Ở Bạch Hổ dãy núi.',[131],null,2],
    ['thanh','Huyền Vũ thành','Ở Huyền Vũ dãy núi; gia tộc Cung là bá chủ.',[131],null,3],
    ['thanh','Tử Kim Thành','Thành cử người dự ngôi sao mới đại hội.',[101],null,2],
    ['thanh','Dực Minh thành','Nơi có Dực Minh.',[71,81],'Thanh Châu',2],
    ['gia','Sở gia','Gia tộc nuôi Sở Phong, bất hòa với Hứa gia.',[1,11,31],'Thanh Châu',2],
    ['gia','Hứa gia','Đối thủ của Sở gia.',[31],'Thanh Châu',2],
    ['hiem','Tu La Quỷ Tháp','Tháp giới linh công hội chiếm giữ.',[191],null,3],
    ['vung','Tần Châu','Sở Phong tới ở chương 326 (tên chương).',[326],null,3]
  ],
  donghai:[
    ['tong','Tàn Dạ Ma Tông','Từng thống trị phương Đông hải vực, Ma tông chi chủ uy chấn thiên hạ.',[791,881,911],null,5],
    ['dao','Tru Tiên quần đảo','Ở Vô Cực Huyết Hải, xếp thiên tài thành "Đệ Nhất… Đệ Cửu Tiên".',[611,641,791,881],'Vô Cực Huyết Hải',4],
    ['vung','Vô Cực Huyết Hải','Biển máu nơi Tru Tiên quần đảo đóng quân.',[641],null,4],
    ['gia','Tử gia','Gia tộc của Tử Linh, bắt nàng về, muốn giết Sở Phong.',[821],null,4],
    ['tong','Tứ Hải thư viện','Ở phía đông hải vực, phải đi nhiều ngày.',[551],null,3],
    ['tong','Thạch Kiếm Tông','Tông chủ bị Sở Phong hạ, Đản Đản được thả ra xem.',[851],null,2],
    ['tong','Phần Thiên Thánh Giáo','Có Hàn Băng sát trận chắn lối vào.',[851,978],null,3],
    ['gia','Lý gia','Mời cường giả giữ trang viên.',[581],null,2],
    ['hiem','Võ Văn Tiên Cảnh','Nơi Sở Phong đổi võ văn lấy cấm võ kỹ.',[645,701],null,3],
    ['hiem','Thiên lộ','Đường ra khỏi hạ giới; có lão vượn giữ trật tự.',[989,1001],null,3]
  ],
  thantho:[
    ['tong','Thanh Mộc Sơn','Tông lớn; Thanh Mộc Nam Lâm chọn đệ tử ưu tú đưa vào.',[1031,1151,1241,2021],null,5],
    ['vung','Thanh Mộc Nam Lâm','Một trong Tứ Lâm của Thanh Mộc Sơn; Hàn gia có vị trí cao.',[1031,1061,1091],'Thanh Mộc Sơn',3],
    ['tong','Tu La Bộ','Bộ do Sở Phong lập trong Thanh Mộc Sơn, thực lực "yêu nghiệt".',[1211,1241],'Thanh Mộc Sơn',2],
    ['vung','Nam Phương Hải Vực','Vùng biển Sở Phong đến từ đó khi vào Thánh Thổ.',[1031],null,3],
    ['tong','Vũ Hóa Tông','Đệ tử bị Sở Phong đánh khi tranh cờ.',[1091,1121],null,3],
    ['gia','Nam Cung Đế tộc','Có Đế cấp huyết thống.',[1631,1661,1871],null,4],
    ['gia','Tây Môn Đế Tộc','Tộc trưởng dùng uy tam phẩm Võ Đế.',[1781,1871],null,4],
    ['tong','Ám Điện','Điện chủ cầm hai Đế binh, coi hạ giới là phế vật.',[1871,1961,2051],null,4],
    ['quoc','Tinh linh quốc','Tinh linh quốc vương cầm Đế binh trường đao.',[1901,2051,2111],null,4],
    ['hiem','Ngũ Độc Sơn','La gia tranh quyền chưởng khống với một nhà khác.',[1691],null,2],
    ['gia','Đường gia','Gia chủ đánh Sở Phong, cùng Tào gia đối phó hắn.',[2171],null,2],
    ['tong','Lục Dương Các','Thế lực Sở Phong coi thường.',[2171],null,2],
    ['tong','Giới sư liên minh','Mời Sở Phong gia nhập.',[1296,1301],null,3]
  ],
  bachluyen:[
    ['tong','Lạc Hà Cốc','Cốc có mộ trong cấm địa; Chiến Hải Xuyên từng xuất hiện ở đây.',[2201,2261,2291],null,3],
    ['tong','Tam Tinh Điện','Cùng Lạc Hà Cốc đi tìm Sở Phong.',[2291,2321],null,3],
    ['gia','Khổng Thị Thiên tộc','Thiên tộc có Khổng Đấu Mặc Uyên.',[2411,2531,2561],null,4],
    ['tong','Hồn Anh Tông','Tông chủ khinh Tà Thần kiếm, cầm trấn ma binh phù.',[2621,2651],null,3],
    ['toc','Viễn cổ Chiến tộc','Tộc của Chiến Hải Xuyên; từng giữ quặng mỏ.',[2261,2441,2531],null,4],
    ['hiem','Bách luyện trận','Nơi rung chuyển bách luyện Emerald thạch.',[2370,2381],null,2],
    ['tong','Ngọc Sơn Tông','Nhóm người tới thăm dò thế cục.',[2471],null,2],
    ['hiem','Vân Hạc Sơn','Truyền tin về Sở Phong.',[2291,2321],null,2]
  ],
  daithien:[
    ['gia','Sở thị Thiên Tộc','Bá chủ một phương thượng giới, tộc của cha Sở Phong.',[2651,2681,2951,3071],null,5],
    ['thanh','Vũ Văn thành','Thành chủ có nhiều Thiên Tiên cao thủ.',[2771,2831],null,3],
    ['gia','Kim Thạch Vương Tộc','Gương mặt quen gặp ở tam đại mỹ nữ.',[2921],null,3],
    ['tong','Cửu Huyền Tông','Đệ tử chế giễu Sở Phong bày trận.',[2871,2891],null,3],
    ['hiem','Cửu Nguyệt Thần Vực','Nơi tu luyện của yêu nghiệt bảng.',[2981,3011],null,3],
    ['hiem','Âm Dương chi môn','Chỉ tiểu bối được vào.',[2981,3071],'Cửu Nguyệt Thần Vực',2],
    ['hiem','Thần Sơn','Được gọi là "trên Thiên Thần Sơn", ơn trời ban.',[2741,3101],null,3],
    ['hiem','Tiên Binh sơn','Thế lực khắp nơi muốn kết giao với người xuất hiện ở đây.',[2711,2831],null,2]
  ],
  tuhanh:[
    ['gia','Lệnh Hồ Thiên Tộc','Hứa bỏ qua chuyện cũ rồi nuốt lời.',[3221,3401,3491],null,4],
    ['gia','Vu Mã Thiên Tộc','Có Vu Mã Thắng Kiệt nổi danh.',[3251,3371],null,4],
    ['toc','Thanh Vũ Yêu Tộc','Toàn Thiên Tiên cảnh, mạnh nhất bát phẩm.',[3131],null,3],
    ['toc','Phần Dã Yêu Tộc','Bị Sở Phong dùng roi lôi đình đánh.',[3161],null,3]
  ],
  tovu:[
    ['tong','Tinh Vực chủ giới','Tổ chức bình chọn tổ võ thập tinh; có Vô Danh Phong Hỏa.',[3371,3461],null,4],
    ['gia','Củng Thị Thiên Tộc','Sở Phong gặp khi vừa tới Cửu Long thượng giới.',[3431],null,3],
    ['gia','Đạm Thai Thiên Tộc','Chủ của lời nguyền hắc mao u linh.',[3461,3521],null,3],
    ['tong','Thiên Đình Thánh Điện','Cung điện cao hơn trời, vật liệu giá trị liên thành.',[3521],null,4],
    ['toc','Phệ Huyết Ma tộc','Ma tộc có Tôn Giả; Phệ Huyết Ma tôn tập kích Sở Phong.',[3551,3611],null,4],
    ['vung','Xích Châu thượng giới','Sở Phong tới ở chương 3294 (tên chương).',[3294],null,3]
  ],
  chuthien:[
    ['tong','Chư Thiên môn','Có Chí Tôn tọa trấn; Thác Bạt Thừa An dưới một người.',[3671,3761,3851,3881],null,5],
    ['tong','Cửu Tinh Thiên Sơn','Tông lớn cùng Chư Thiên môn.',[3971,4001],null,4],
    ['tong','Phong Lôi Kiếm Phái','Đệ tử đi cùng Cửu Tinh Thiên Sơn.',[3971,4001],null,3],
    ['tong','Hồng Y thánh địa','Coi "Tu La công tử" là khách quý.',[3851,3941,4031],null,3],
    ['vung','Thất Dương Sơn Mạch','Nơi an toàn Sở Phong gửi Tống Ca.',[3773,3791,3911],null,3],
    ['hiem','Minh Kính Hải','Mặt biển phẳng như gương, trời bão quanh năm.',[3701],null,3],
    ['tong','Thủy Kính Động Thiên','Của Dương Thâm Thâm.',[3788,3791],'Thất Dương Sơn Mạch',2],
    ['tong','Xích Phong các','Đệ tử náo loạn.',[3941],null,2],
    ['toc','Tật Phong Liệp Tộc','Tộc cưỡi cự thú.',[3911],null,2]
  ],
  thanhquang:[
    ['tong','Vân Không Tiên Tông','Có tiếng ở Thánh Quang thiên hà; che chở Hồng Y thánh địa.',[4361,4421,4541],null,5],
    ['tong','Ngọa Long Vũ Tông','Tông có Bắc Huyền Viện, Đông Long Viện.',[4241,4691,4781,5141],null,4],
    ['vung','Bắc Huyền Viện','Ngoại viện của Ngọa Long Vũ Tông.',[4691,4721],'Ngọa Long Vũ Tông',3],
    ['vung','Đông Long Viện','Viện của Ngọa Long Vũ Tông.',[4691,4721],'Ngọa Long Vũ Tông',2],
    ['tong','Thánh Cốc','Giữ Thánh Quang huyết mạch, Thánh Quang cổ trận và tàng kỹ các.',[4901,5141,5201],null,4],
    ['hiem','Vô Tận Thâm Uyên','Có long mạch Bản Nguyên thạch, hy vọng của Tổ Vũ Long thành.',[4151,4181],null,3],
    ['vung','Luân Hồi thượng giới','Sở Phong tới cùng Vu Đình, học pháp nguyền rủa.',[4061,4211],null,3],
    ['hiem','Viễn Cổ Linh Vực','Linh vực mở ra (tên chương 4228, 4250).',[4228,4250],null,3],
    ['hiem','Hung Thú Ngục Giới','Rừng rậm đang bị nuốt dần.',[4751],null,3],
    ['dao','Tinh Túc Tiên Đảo','Có Thái Thượng Trưởng Lão và đảo chủ.',[4091],null,2],
    ['hiem','Tử Tinh dị giới','Dị giới đổi khác khi Sở Phong ở đó (tên chương 4074).',[4074,4091],null,3],
    ['hiem','Phong Bạo Đấu Long đài','Đài có thế giới riêng, giới hạn tuổi.',[4571],null,2]
  ],
  cuuhon:[
    ['toc','Cửu Hồn Thánh Tộc','Tộc đứng đầu Cửu Hồn thiên hà.',[4481,5051,5081],null,5],
    ['vung','Đông Vực','Nơi Nguyện Thần bà bà, Đạo Hải Tiên Cô có danh.',[4991,5007],null,4],
    ['toc','Yêu Linh Tộc','Thử thách chữ trên thạch bi.',[5051],null,3],
    ['tong','Giới Thuật Tông','Tông kết giới thuật có người khai sáng là tổ tiên một nhân vật.',[5171],null,3],
    ['gia','Mạt Vũ Hàm gia','Gặp khi khôi phục tự do.',[5291],null,2]
  ],
  dodang:[
    ['toc','Đồ Đằng Long Tộc','Chưởng quản Đồ Đằng Thiên Hà; tổ chức tối cường Võ Tôn.',[5321,5351,5531,6071],null,5],
    ['hiem','Tàng Binh Điện','Đa số tộc nhân Long tộc cả đời không được vào.',[5471],'Đồ Đằng Long Tộc',3],
    ['hiem','Cổ giới','Gửi thư mời "Cổ Giới Yêu"; vị trí trong Tu Võ Giới chưa rõ.',[5292,5308,5321,5339],null,3],
    ['thanh','Thần Thể Vương Thành','Thành của Khổng Điền Huệ (thuộc Thần Thể Thiên Hà, ước lượng).',[5111],null,3]
  ],
  thatgioi:[
    ['tong','Thất Giới Thánh Phủ','Thế lực giới linh sư mạnh nhất Tu Võ Giới; bảy cốc địa mang tên thất Linh Giới.',[5351,5621,5681,6581],null,5],
    ['tong','Ngục Tông','Thù Sở Phong; chí bảo Ngục Thần Khâm Tứ; ngục chủ là ông của Sở Phong.',[5021,6101,6671,6701],null,5],
    ['gia','Hoàng Phủ Thiên Tộc','Chưa hoàn toàn xuất thế; Sở Phong đoạt được Thần Binh của tộc.',[5801,5951,6161],null,4],
    ['toc','Tiên Hải Ngư Tộc','Tộc của Tiểu Ngư Nhi; mua được Phong Thần trúc giản.',[5591,5951,6578],null,4],
    ['toc','Linh Thần nhất tộc','Có Thần Tuệ đi theo Sở Phong.',[6395,6401,6423],null,3],
    ['tong','Tổ Võ Giới Tông','Từng chưởng quản bảy cốc địa; di tích và chủ thành hiện lại.',[5854,5951,6463,6581],null,4],
    ['tong','Thương Khung tiên tông','Tông chủ là chủ một phương Thiên Hà.',[5681],null,4],
    ['tong','Võ giả thương hội','Thương hội khắp Tu Võ Giới (không có ở Tổ Vũ, Cửu Hồn thiên hà).',[5591],null,3],
    ['hiem','Cửu Giới Tiên Vực','Nơi Sở Phong gặp Trương Anh Hùng.',[5601,6341],null,3],
    ['vung','Tiên Giang thượng giới','Sư tôn Long Hiểu Hiểu ở lại đây.',[5621],null,3],
    ['hiem','Thần Sơn miếu đường','Miếu đường trong Thần Sơn.',[5891],null,2],
    ['hiem','Bất Hủ tinh vực','Tinh vực biến mất rồi hiện ra (tên chương 4857, 6511).',[4857,6511],null,4]
  ]
};
const st=STORIES.find(s=>s.id==='tu-la-vo-than-tu-la-vu-than-truyen-chu'),SZ=(window.SIZES&&SIZES['tu-la-vo-than-tu-la-vu-than-truyen-chu'])||{};
st.worlds.forEach(w=>{w.places=(PL[w.id]||[]).map(([t,n,d,ch,inn,s])=>({t,n,d,ch,in:inn||null,s:s||SZ[w.id+'|'+n]||2}))});
})();
