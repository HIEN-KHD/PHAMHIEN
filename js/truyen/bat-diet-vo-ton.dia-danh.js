/* ===== Bất Diệt Võ Tôn — địa danh của từng thế giới =====
   Mỗi mục: [loại, tên, mô tả, [chương], thuộc, quy mô 1–5] */
(function(){
const PL={
  danglong:[
    ['tong','Thái Huyền Môn','Một trong ba đại Đạo Môn của Đằng Long đại lục, môn phái cổ xưa; nơi Cổ Phi lớn lên từ năm tám tuổi.',[1,21,41],null,5],
    ['tong','Thượng Thanh Tông','Đạo Môn có đệ tử dùng đạo phù uy lực lớn.',[21,361,441],null,4],
    ['tong','Lạc Hà Môn','Môn phái bị Đông Phương Thần mượn danh Cổ Phi xông lên, đánh bại cả môn chủ.',[461],null,3],
    ['tong','Nghiễm Thành tiên phái','Tiên phái có đệ tử Lưu Vân Hạc dùng tinh khí kiếm quang.',[81,361,421],null,3],
    ['tong','Phật môn Tây Thổ','Phật môn lực áp thiên hạ, khiến Đạo Môn và Yêu tộc mất mặt.',[381],null,4],
    ['toc','Yêu tộc','Một trong ba thế lực lớn của thiên hạ cùng Đạo Môn và Phật môn.',[381,401,421],null,4],
    ['gia','Triệu gia','Thế gia có cao thủ thế hệ trước đá gãy xương Cổ Phi.',[301,761,941],null,3],
    ['gia','Khương gia','Thế gia có tiểu thần vương bị quyền rồng của Cổ Phi đánh tới.',[881,941],null,3],
    ['gia','Chu gia','Thái cổ thế gia, có sáu đại giáo thần phục làm thế lực bên ngoài.',[801,941],null,4],
    ['thanh','Thanh Thạch Trấn','Trấn Cổ Phi tiến về ở ch.107.',[107],null,1],
    ['thanh','Hồng Nguyệt thành','Thành có Mạnh gia; Cổ Phi ẩn trong một đình viện hoang ở thành đông.',[301],null,2],
    ['hiem','Thiên Táng Cốc','Thung lũng Cổ Phi tiến về ở ch.172.',[172],null,2],
    ['hiem','Liệt Thiên Cốc','Cốc mở ra khi 81 tọa độ không gian được đả thông.',[221],null,2],
    ['vung','Cực Bắc Ma Vực','Ma vực ở cực bắc, nơi gần như không ai biết Cổ Phi.',[219,281,301],null,3],
    ['hiem','Tiên Ma vực sâu','Vực sâu có cầu cổ; Cổ Phi và Đan Thần Tử vào đây.',[321,341],null,3],
    ['hiem','Tử vong thế giới','Thế giới chết, trong sâu có ốc đảo; Cổ Phi xuất phát vào đây ở ch.502.',[487,502,550],null,3],
    ['hiem','Cửu Sơn','Chín ngọn núi đầy cốt phấn của Bất Tử Khô Lâu nhất tộc.',[601,661],null,3],
    ['hiem','Long Cốc','Cốc nơi Cổ Phi dùng Sơn Hà đỉnh luyện đan.',[761,781],null,2]
  ],
  nhangian:[
    ['vung','Đông Vực','Vực của Nhân Gian giới có cấm địa Thiên Khư.',[1621,1641,2654],null,4],
    ['vung','Trung Châu','Châu có Trung Châu Tiên Phủ và cuộc thi Trung Châu.',[1992,1993,2001],null,4],
    ['vung','Tuyết Vực','Vực phương bắc có cấm khu; Triệu gia ở đây.',[2695,2719,2721],null,3],
    ['vung','Hải ngoại tam đại châu','Ba châu ngoài biển (Hạo Nguyệt Châu, Nhạc Tinh Châu…) bị Cổ Phi thống nhất.',[2311,2343,2385],null,4],
    ['hiem','Thiên Khư','Cấm địa trong Đông Vực, nơi đệ tử các thế gia lớn tu luyện.',[1621],'Đông Vực',3],
    ['tong','Trung Châu Tiên Phủ','Tiên phủ bị Cổ Phi công phá; dư nghiệt còn lại về sau.',[1992,2084,2855],'Trung Châu',4],
    ['gia','Hoang Cổ Chu Gia','Hậu duệ Nhân Hoàng, mang huyết mạch Nhân Hoàng vô địch.',[1661,1821],null,4],
    ['gia','Hoang Cổ Triệu Gia','Thế gia có đệ tử tu luyện trong Thiên Khư; Tuyết Vực Triệu Gia.',[1621,1641,2701],null,4],
    ['gia','Tử Vân gia tộc','Đứng sau thập đại giáo.',[1941,1961,2021],null,4],
    ['gia','Cổ Thị gia tộc','Gia tộc gặp nguy khi Cổ Phi vừa độ Thánh Vương Kiếp.',[2301],null,3],
    ['thanh','Đông Hoàng Thành','Thành Đông Phương Tôn bỏ chạy, không còn ai chống được Cổ Phi.',[2521,2561,2581],'Đông Vực',3],
    ['thanh','Vạn Tượng Thành','Thành có phủ thành chủ nơi Cổ Phi cường thế ra tay.',[2801,2861],null,3],
    ['thanh','Hắc Vu Thành','Thành bị Thánh Hoàng đại quân tấn công.',[1581,2301],null,2],
    ['thanh','Nhạc Hà Thành','Thành gặp nguy, cạnh Nam Thiên Thành.',[2681],null,2],
    ['hiem','Linh Sơn nhân gian','Thần Sơn ở Tây Thổ nhân gian; tương truyền Phật Chủ giảng đạo trên đỉnh.',[1561],null,3],
    ['hiem','Di tích Cổ Thiên Đình','Di tích có Nam Thiên Môn, Cửu Hoàng Thánh Tôn trấn giữ.',[2908,2920,2921],null,4]
  ],
  thiengioi:[
    ['vung','Đông Thổ','Vùng của Thiên giới có Thiên Huyền Thành.',[1081,1101],null,3],
    ['vung','Trung Thổ','Vùng các đại giáo của Thiên giới.',[1101],null,3],
    ['vung','Tuyết Vực Thiên giới','Đại vực lạnh nhất Thiên giới, có Tuyết Vực Thiên Cung và hoang mạc lớn.',[1101],null,3],
    ['thanh','Đông Quận Thành','Thành ở giao giới Trung Thổ và Đông Thổ, có đấu giá của Ẩn Nguyệt Các.',[1101],null,3],
    ['tong','Ẩn Nguyệt Các','Tổ chức hội đấu giá thu hút cả hoàng giả.',[1101],null,3],
    ['thanh','Thiên Đế Thành','Thành của Nguyên Cổ Tiên Đế, người lạ khó tiếp cận.',[1061,1081],null,4],
    ['hiem','Huyền Minh 13 giới','Mười ba tầng giới; giới thứ mười gặp nguy.',[1081,1093],null,3],
    ['hiem','Linh Sơn','Thánh địa Phật môn Tây Thổ ở Thiên giới.',[1361,1381],null,4],
    ['hiem','Man Hoang thiên địa','Thực ra là tầng thứ ba Phật Cung của Phật Chủ; có Man Hoang Yêu tộc và Quỷ tộc.',[1441,1461,1481],null,3],
    ['hiem','49 tòa Long Sơn','Dãy núi rồng, chỗ sâu có khí tức đáng sợ.',[1181],null,2]
  ],
  hoanggioi:[
    ['tong','Huyền Ma Sơn','Núi ma có Huyền Ma cung; Bạch Y Ma Nữ bị dồn tới đây.',[3061,3081,3141],null,4],
    ['thanh','Huyền Đô Thành','Thành lớn của Hoang giới có phủ thành chủ.',[3081],null,3],
    ['tong','Diệt Thần Ma Cung','Ma cung phục kích Cổ Phi.',[3161],null,3],
    ['tong','Thiên Ma Hồ','Thế lực mời được Liễu Ma, một đời Ma Tôn.',[3061,3101],null,3],
    ['hiem','Phần Ma Tuyệt Vực','Tuyệt vực đốt ma; có truyền thuyết riêng.',[3091,3101,3112],null,3],
    ['vung','Hắc Ma Hải','Biển tối có Man Hoang hòn đảo và Tử Linh Chi Đảo.',[3261,3281],null,3],
    ['dao','Tử Linh Chi Đảo','Đảo của các tử linh.',[3281],'Hắc Ma Hải',2]
  ],
  thuyto:[
    ['vung','Đông Châu','Bộ châu Cổ Phi tới đầu tiên; tranh ai thống nhất Đông Châu.',[3341,3425,3523],null,4],
    ['vung','Nam Châu','Bộ châu có Nam Châu Đao Đế Diệp Kinh Thần, Nam Thiên Thành.',[3561,3628],null,4],
    ['vung','Trung Châu Tổ Thần giới','Bộ châu trung tâm; nơi Trung Châu chi chiến.',[3541,3544,3550],null,4],
    ['tong','Ứng Thiên Tông','Tông môn lớn của Thủy Tổ giới.',[3657,3661,3681],null,4],
    ['toc','Bàng Tộc','Tộc bị tập kích, Cổ Phi cảm ứng nhiều Nhân tộc quanh tổ địa.',[3321,3461,3541],null,4],
    ['toc','Thiên tộc','Đại tộc tu luyện; Sở Tộc chỉ gần bằng.',[3861,3881],null,4],
    ['toc','Lý Tộc','Tộc có hai đại Thủy Tổ trong tám đại Chí Tôn.',[3841,3861],null,3],
    ['thanh','Vân Thiên Thành','Thành có thiên tài bị Cổ Phi dọa vỡ mật.',[3681,3701],null,3],
    ['thanh','Hắc Hỏa Thành','Thành bị kiếm trận chém vào.',[3641],null,2],
    ['hiem','Thủy Tổ Ma vực','Ma vực xuất hiện dị tượng kinh người.',[3960,3961],null,3]
  ],
  thaithuy:[
    ['tong','Ngũ Hành Thiên Tông','Một trong các thế lực cấp cao nhất Thái Thủy giới.',[4461],null,5],
    ['quoc','Bình Thiên thần triều','Thần triều đem quân đánh Võ Cực hoàng triều của Nhân Gian giới.',[4421],null,4],
    ['tong','Luyện Ngục Ma Cung','Ma cung có ma đầu đánh trọng thương Nhân Tiên.',[4461],null,3],
    ['hiem','Thiên Lang Sơn mạch','Dãy núi có Thiên Lang truyền thừa.',[4461],null,3]
  ],
  tienvo:[
    ['thanh','Đông Nhạc Thành','Thành chứng kiến Hóa Hình Lôi Kiếp của Ma Tiên Nhi.',[4021],null,3],
    ['vung','Trung Ương Tiên Vực','Tiên vực trung tâm, đích Cổ Phi hướng tới.',[4039,4041],null,4],
    ['tong','Phi Tiên Tông','Tông có Đại Trưởng Lão bị Cổ Phi tìm tới.',[4041],null,2],
    ['tong','Thần Đao môn','Môn phái của Mạc Sầu Thiên.',[4041],null,2],
    ['toc','Ảnh tộc','Tộc có tộc chủ bị chém làm đôi.',[4061],null,2]
  ],
  thienthan:[
    ['vung','Nam Thần Vực','Vực phía nam của Thiên Thần giới.',[4081],null,4],
    ['tong','Nam Thiên Thần Cung','Thần cung bổ nhiệm thành chủ Nam Côn Cổ Thành.',[4081],'Nam Thần Vực',4],
    ['gia','Vương gia','Tu luyện gia tộc gần ngang năm đại thế lực Nam Thần Vực; đại thiếu bị Cổ Phi giẫm chết.',[4081,4101],'Nam Thần Vực',3],
    ['thanh','Nam Côn Cổ Thành','Thành Cổ Phi được tiếp dẫn sứ đưa tới, có Sinh Tử Đài.',[4081],'Nam Thần Vực',3],
    ['thanh','Thiên Long Thành','Thành bị bóng đen bao vây sau khi Cổ Phi xử lý Tử Linh Đại Đế.',[4121],null,3],
    ['toc','Tần Tộc','Tộc có Đế nữ Tần Dao.',[4201],null,4],
    ['toc','Thiên Nhân bộ tộc','Bộ tộc có Thiên Nhân Thành và chiến thành; lão tổ Ly Uyên bị Cổ Phi trấn áp.',[4221,4241,4261],null,4],
    ['tong','Cực Đạo Thiên Tông','Tông có Đệ Nhất Chiến Thành, chiến hồn bất diệt khi thành còn.',[4261],null,4]
  ],
  nguyenma:[
    ['thanh','Thiên Đế Thành (Nguyên Ma giới)','Cứ điểm cuối của Nhân tộc bị Thất Đại Ma Tộc vây.',[4661],null,4],
    ['toc','Thất Đại Ma Tộc','Bảy tộc ma vốn đồng khí liên chi, bỗng quay ra đánh nhau.',[4661,4681],null,5],
    ['hiem','Phục Long Sơn','Núi có quặng mỏ; Cổ Phi từng đào mỏ ba năm ở đây.',[4701],null,3],
    ['thanh','Hắc Thạch Trấn','Trấn nhỏ dưới núi.',[4701],null,1]
  ],
  vocuc:[
    ['quoc','Đông Nguyệt Hoàng Triều','Hoàng triều có Nam Lân Thành, Phi Vân Thành.',[5421,5481,5521],null,4],
    ['quoc','Bá Thiên Hoàng Triều','Hoàng triều đem đại quân binh lâm thành hạ.',[5421,5441,5481],null,4],
    ['thanh','Hắc Lân Thành','Thành có Hổ gia; địa giai chiến tướng chỉ là bậc thấp nhất.',[5421,5441,5461],'Đông Nguyệt Hoàng Triều',3],
    ['thanh','Phi Vân Thành','Thành nhỏ hơn Hắc Lân Thành, thành chủ Trần Ngạo Thiên.',[5501,5521],'Đông Nguyệt Hoàng Triều',3],
    ['gia','Hổ gia','Gia tộc ở Hắc Lân Thành.',[5421,5441],'Đông Nguyệt Hoàng Triều',2],
    ['gia','Đồ gia','Gia tộc tranh chấp với Hổ gia.',[5441],'Đông Nguyệt Hoàng Triều',2]
  ],
  dima:[
    ['vung','Đông cảnh','Vùng phía đông của Dị Ma giới, có tuyệt địa.',[5921,6061],null,4],
    ['hiem','Đế Cực Ma Sơn','Núi ma đầy phong ấn của nữ nhân thần bí; nhốt Dị Ma Tổ Long Quy.',[5921,5941,5981],'Đông cảnh',4],
    ['hiem','Quy Sơn','Địa bàn ẩn giấu mấy ngàn năm của Tần gia.',[5861],null,3],
    ['thanh','Đạp Thiên Thành','Thành dị ma bị Cổ Phi ném dị ma vào.',[6041],null,3]
  ],
  tutien:[
    ['vung','Thiên Nguyên vực','Vực của Nhân tộc có Thiên Nguyên Thành, sông Thiên Nguyên.',[6401,6481],null,4],
    ['gia','Trần Gia','Gia tộc ở Thiên Nguyên Thành có ba Tiên Quân lão tổ.',[6401,6441],'Thiên Nguyên vực',3],
    ['tong','Nhạc Tinh Tông','Tông tuyển đệ tử bằng khảo thí linh căn.',[6241,6261],null,3],
    ['thanh','Vạn Tiên Thành','Thành nơi thiên tài Mộc tộc bị giết.',[6541,6601],null,3],
    ['thanh','Trấn Bắc Thành','Thành ở Trấn Bắc Quan chặn hải yêu Bắc Hải; Thiên tộc Tiên Đế mở hộ thành.',[6701,6721],null,4],
    ['vung','Bắc Hải','Biển có đại yêu đánh vào Nhân tộc.',[6641,6661],null,4],
    ['tong','Ngự Thú Tiên Tông','Tông có chí bảo Phong Lôi Sí.',[6461,6501],null,3],
    ['hiem','Hắc Minh Uyên','Vực sâu Hắc Minh Ma Quân trốn vào.',[6381],null,3]
  ]
};
const st=STORIES.find(s=>s.id==='bat-diet-vo-ton'),SZ=(window.SIZES&&SIZES['bat-diet-vo-ton'])||{};
st.worlds.forEach(w=>{w.places=(PL[w.id]||[]).map(([t,n,d,ch,inn,s])=>({t,n,d,ch,in:inn||null,s:s||SZ[w.id+'|'+n]||2}))});
})();
