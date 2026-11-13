/* ===== Thần Võ Chiến Vương — địa danh của từng thế giới =====
   Mỗi mục: [loại, tên, mô tả, [chương], thuộc, quy mô 1–5]  (định dạng như truyện mẫu; xem skill references/du-lieu.md) */
(function(){
const PL={
  hoavuc:[
    ['vung','Thập vạn đại sơn','Dãy núi mênh mông ở một góc Hỏa vực; nơi Giang Thần trọng sinh.',[1,41],null,4],
    ['quoc','Đại Hạ vương triều','Vương triều đứng sau Hắc Long thành; Thần Long đại tướng quân Tiết Kính Thiên từng liên thủ trấn áp cha Giang Thần.',[1,124,211],null,5],
    ['quoc','Đại Tề quốc','Quốc gia có vương tử Sa Ưng và hộ quốc trưởng lão; cử đội ngũ vào hoàng lăng.',[88,100],null,3],
    ['vung','Nam Phong Lĩnh','Một góc Thập vạn đại sơn do Ninh phủ, nay là Giang phủ, khống chế.',[1,33,331],'Thập vạn đại sơn',3],
    ['gia','Giang phủ','Gia tộc của Giang Thần ở Nam Phong Lĩnh, trước gọi Ninh phủ; phủ chủ là ông nội Giang Vấn Thiên.',[3,20],'Thập vạn đại sơn',3],
    ['thanh','Hắc Long thành','Bản tông họ Ninh ngoài Thập vạn đại sơn; nơi Thần mạch bị cướp, về sau bị tấn công và nổ thành.',[1,213,340,345],null,4],
    ['hiem','Hắc Long uyên','Vực sâu nơi cha Giang Thần bị trận pháp họ Ninh giam cầm.',[1,3,349],null,3],
    ['thanh','Bạch Thủy thành','Thành của Tô gia trong Thập vạn đại sơn.',[5,13],'Thập vạn đại sơn',2],
    ['gia','Tô gia','Gia tộc ở Bạch Thủy thành, yếu hơn Giang phủ; Cao Nguyệt từng tới cầu viện.',[5,10],'Thập vạn đại sơn',2],
    ['tong','Vấn Kiếm Môn','Môn phái kiếm; Tụ nguyên sơ kỳ có kiếm điểm là đủ tư cách gia nhập.',[19,27],'Thập vạn đại sơn',2],
    ['tong','Thanh Thành phái','Cùng Hỏa Sư giúp và Huyết Thủ Môn xâm lấn Nam Phong Lĩnh, muốn chia cắt Giang gia.',[33],'Thập vạn đại sơn',2],
    ['tong','Huyết Thủ Môn','Một trong ba thế lực xâm lấn Nam Phong Lĩnh.',[33,35],'Thập vạn đại sơn',1],
    ['toc','Lôi tộc','Tộc dùng cung tên trên sông, suýt bắn nhầm Giang Thần.',[28,31],null,2],
    ['tong','Thiên Đạo Môn','Một trong mười cường tông môn Hỏa vực; Giang Thần vào ngoại môn rồi nội môn, tu ở Xích tiêu phong.',[42,70,79],null,5],
    ['hiem','Hóa long trì','Ao tu luyện trong Thiên Đạo Môn, nơi Giang Thần gặp sư tỷ Lý Tuyết Nhi.',[78],null,2],
    ['thanh','Cửu Long thành','Đầu mối của tỉnh Thương Uyên, trạm cuối phi thuyền Phá vân, gần Thiên Đạo Môn.',[41,43],null,3],
    ['dao','Phù Không đảo','Một trong mười cường tông môn Hỏa vực, thực lực không thua Thiên Đạo Môn.',[89,100],null,4],
    ['tong','Thái Ất môn','Tông có phó chưởng giáo Phong Thiếu Vũ cảnh Thông thiên; muốn thu Ninh Hạo Thiên.',[121],null,3],
    ['hiem','Hoàng lăng Chu Tước quốc','Lăng mộ dưới đất của Chu Tước quốc đã diệt vong; có Dẫn Hồn điện và nhiều bảo vật.',[97,100,112],null,3],
    ['thanh','Chu Tước thành','Thành gần di tích Chu Tước quốc, nơi các đội tụ lại trước khi vào hoàng lăng.',[85,88],null,2],
    ['tong','Hắc Bạch Môn','Tổ chức sát thủ truy sát Giang Thần.',[109,172],null,3],
    ['tong','Thiên Cơ các','Bán tình báo; từng cho biết nguồn ba loại linh đan và tin về Cao Nguyệt.',[119,136,229],null,2],
    ['thanh','Hùng Thành','Thành có cửa truyền tống; Giang Thần gây động tĩnh lớn ở đây.',[172,178],null,2],
    ['thanh','Hoàng Đô','Kinh đô Đại Hạ, có "Hoàng Đô tứ thiếu" như Hoàng Phủ Hoa.',[192,193],'Đại Hạ vương triều',3],
    ['toc','Thương Mộc bộ lạc','Bộ lạc ở chỗ giao giới Hỏa vực và Mộc vực.',[184],null,2]
  ],
  longvuc:[
    ['quoc','Thần Long hoàng triều','Hoàng triều xưa của Long vực; hoàng thất tàn dư lập ra Tà Vân Điện.',[412,457],null,4],
    ['thanh','Thánh Thành','Thành rất lớn ở trung tâm Long vực, đi bộ mấy ngày không hết; quê của Cao Nguyệt.',[235,238],null,5],
    ['tong','Thánh Viện','Học viện tuyển nhân tài các vực; Giang Thần vào lớp đặc cấp và tốt nghiệp sớm.',[137,236,246,374],null,5],
    ['tong','Anh Hùng Điện','Thánh địa Long vực, có Thời Quang Chi Điện riêng; về sau bị công phá, Mộ Dung gia làm chủ.',[274,384,490],null,5],
    ['hiem','Thời Quang Chi Điện','Có hai tòa: cho đệ tử Thánh Viện và cho người Anh Hùng Điện; hút linh khí bù cảnh giới rất nhanh.',[256,274,277],null,3],
    ['gia','Cao gia','Thế gia nắm Thiên Phượng huyết thống, nhà ngoại Giang Thần; về sau thành lực lượng phản loạn.',[229,259,376,490],null,4],
    ['thanh','Hỏa Phượng thành','Thành của Cao gia; Giang Thần và Cao Nguyệt bị đưa tới ngàn phong ngoài thành.',[371,376],null,3],
    ['gia','Mộ Dung gia','Thế gia kiêu ngạo; khi Anh Hùng Điện sụp thì đổi khách làm chủ Long vực.',[304,479,490],null,4],
    ['tong','Tà Vân Điện','Do hoàng thất tàn dư Thần Long hoàng triều lập ra; biết lối vào Thần Long bí tàng.',[272,409,412,465],null,4],
    ['tong','Kiếm Minh','Liên minh kiếm khách ở Thánh Thành, không để Giang Thần yên tu hành.',[286,385],null,3],
    ['tong','Thần Kiếm Hội','Hội do Giang Thần chính thức lập ra.',[405,406],null,3],
    ['gia','Úy Trì gia','Thế gia của Úy Trì Hoành và Úy Trì Thiên; Úy Trì Thiên bị giết ở ch.423.',[396,397,423],null,2],
    ['hiem','Thần Long bí tàng','Tiểu thế giới của Thần Long hoàng triều; các phe tranh Thần Long Châu.',[404,410,414],null,4],
    ['thanh','Võ Hoàng Thành','Thành có gác chuông cao nhất; báu vật tìm được đều rơi vào tay kẻ mạnh.',[429,430,433],null,3],
    ['hiem','Vùng mỏ Viêm Long','Vùng mỏ tranh chấp, dưới đáy có Viêm Long bản nguyên.',[447,454,457],null,2]
  ],
  thienha:[
    ['vung','Trung Châu','Vùng trung tâm; đeo chiến hoàn bạc là người tài, chiến hoàn vàng rất hiếm.',[493,496],null,4],
    ['tong','Thái Nhạc Môn','Tông môn có địa vị cao ở Trung Châu.',[491,493],'Trung Châu',3],
    ['thanh','Độc Nguyệt Thành','Thành ở Trung Châu; có trưởng lão Vô Lượng Kiếm Phái cảnh Tôn giả.',[496,499],'Trung Châu',2],
    ['tong','Vô Lượng Kiếm Phái','Kiếm phái nắm Vô Lượng Kiếm đạo, có chiến hoàn màu vàng.',[496,502,583],null,4],
    ['quoc','Phi Long hoàng triều','Hoàng triều tàn bạo; Giang Thần bị ép gia nhập làm tướng.',[499,502,535],null,5],
    ['tong','Nghịch Long quân','Quân từ Cửu Thiên Giới, giằng co với Phi Long hoàng triều.',[490,502,508],null,4]
  ],
  chientruong:[
    ['toc','Ma tộc','Tàn dư yêu ma bị cửu giới trục xuất tới đây; gia nhập khiến các chiến đoàn khổ chiến.',[523,532],null,4],
    ['tong','Xích Diễm Doanh','Một doanh quân trên chiến trường, đối đầu đội của Giang Thần.',[509,550],null,3],
    ['tong','Quân Pháp Xử','Cơ quan quân pháp trong quân đội.',[520],null,2],
    ['hiem','Thung lũng hung thú','Nơi Giang Thần đột phá Tôn giả.',[541,542],null,2],
    ['toc','Yêu tộc','Yêu thú hóa hình từ Yêu giới, phá Yêu Linh Cấm để vào cửu giới.',[556],null,3]
  ],
  chanvu:[
    ['tong','Thánh Võ Viện','Viện tối cao của hạ tam giới, ban pháp điển, cấm Đại tôn giả can thiệp chiến sự.',[502,562,580],null,5],
    ['thanh','Thần Võ Thành','Thành của Thánh Võ Viện; ở đây giao thiệp và thủ đoạn quan trọng hơn thực lực.',[580,586],null,4],
    ['thanh','Thủy Long Thành','Thành buôn bán, nhà trọ thu lợi lớn.',[571],null,2],
    ['tong','Thiên Nhất Môn','Môn phái có đệ tử mở cửa tiệm ở Thủy Long Thành.',[571,574,589],null,3],
    ['gia','Thượng Quan gia','Thế gia đòi Thánh Võ Viện giao Giang Thần vì hắn giết người của họ.',[568,583],null,3],
    ['tong','Vân Lam Môn','Môn phái của Đường Thi Nhã.',[580,610],null,3],
    ['gia','Đường gia','Gia tộc của Đường Thi Nhã; phụ thân nàng là Đại trưởng lão.',[580],null,2]
  ],
  linhvuc:[
    ['toc','Băng Linh tộc','Tộc của sư tỷ Lý Tuyết Nhi, tu Băng tâm quyết.',[232,364],null,5],
    ['quoc','Thiên Linh hoàng triều','Hoàng triều có hoàng tộc mang năng lực đặc biệt.',[367],null,3]
  ],
  thanhvuc:[
    ['tong','Lăng Vân Điện','Một trong ba thế lực lớn của Thánh Vực; điện chủ là cha kiếp trước của Giang Thần.',[1],null,5],
    ['vung','Thiên Vực','Vùng có tứ thánh; Giang Thần kiếp trước được gọi là Thiên Vực đệ nhất công tử.',[1],null,4],
    ['hiem','Thiên Vực chiến trường','Nơi Thiên Phong đạo nhân đang giết địch.',[1],null,3]
  ]
};
const st=STORIES.find(s=>s.id==='than-vo-chien-vuong'),SZ=(window.SIZES&&SIZES['than-vo-chien-vuong'])||{};
st.worlds.forEach(w=>{w.places=(PL[w.id]||[]).map(([t,n,d,ch,inn,s])=>({t,n,d,ch,in:inn||null,s:s||SZ[w.id+'|'+n]||2}))});
})();
