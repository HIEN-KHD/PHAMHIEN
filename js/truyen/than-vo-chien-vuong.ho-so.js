/* ===== Thần Võ Chiến Vương — nhân vật, hành trình, công pháp & bảo vật =====
   Định dạng như truyện mẫu; nhóm nhân vật/công pháp dùng chung PEOPLE_GROUPS, ARTS_GROUPS. */
(function(){
const people=[
  ['gd','Giang Thần','Nhân vật chính. Kiếp trước là đệ nhất công tử Thánh Vực, tuyệt mạch, bị người yêu phản bội mà chết; trọng sinh năm trăm năm sau vào thân thiếu niên Ninh Thần ở Cửu Thiên đại lục.',['hoavuc','longvuc','thienha','chientruong','chanvu'],[1,3,544]],
  ['gd','Giang Thanh Vũ','Cha (trước gọi Ninh Thanh Vũ). Kiếm khách nổi danh Thập vạn đại sơn, đệ tử Thiên Phong đạo nhân; bị họ Ninh giam dưới Hắc Long uyên.',['hoavuc'],[1,3,349,351]],
  ['gd','Cao Nguyệt','Mẹ, đại tiểu thư Cao gia mang Thiên Phượng huyết thống; từng trúng độc già đi.',['hoavuc','longvuc'],[1,137,229]],
  ['gd','Giang Vấn Thiên','Ông nội, phủ chủ Giang phủ.',['hoavuc'],[20,41]],
  ['hn','Lý Tuyết Nhi','Sư tỷ ở Thiên Đạo Môn, người Băng Linh tộc tu Băng tâm quyết; thành người yêu ở ch.364 rồi về Linh vực giới.',['hoavuc','linhvuc'],[78,232,364]],
  ['hn','Văn Tâm','Nữ kiếm khách Thiên Đạo Môn nắm kiếm điểm.',['hoavuc'],[45,109,137]],
  ['hn','Phi Nguyệt công chúa','Công chúa Đại Hạ, dùng bí thuật Thần nguyệt thức.',['hoavuc','longvuc'],[203,205,328]],
  ['hn','Bạch Linh','Cùng Giang Thần vạn dặm độc hành, sau vào Thánh Viện.',['hoavuc','longvuc'],[178,256,278]],
  ['hn','Ứng Vô Song','Người Anh Hùng Điện dẫn Giang Thần làm quen; bị cô lập.',['longvuc'],[253,274,295]],
  ['hn','Đường Thi Nhã','Đệ tử thân truyền Vân Lam Môn, con gái Đại trưởng lão Đường gia.',['chanvu'],[577,580]],
  ['dh','Thiên Phong đạo nhân','Sư phụ của cha, đại năng Hỏa vực; đang chiến đấu ở Thiên Vực chiến trường.',['hoavuc','thanhvuc'],[1,41]],
  ['dh','Hàn Ty Minh','Người trên Thần Long bảng, cùng vào bí tàng; sau vào chiến xa quân.',['longvuc','chientruong'],[400,421,532]],
  ['dh','Đỗ Trấn Phi','Đại tướng quân quân đoàn thứ ba, tính phóng khoáng, tin dùng Giang Thần.',['thienha','chientruong','chanvu'],[511,532,589]],
  ['dt','Ninh Hạo Thiên','Con Đại phu nhân họ Ninh, được ghép Thần mạch cướp của Giang Thần; đối thủ suốt truyện.',['hoavuc','longvuc'],[1,120,322,326,481]],
  ['dt','Tô Thuyên','Đại phu nhân họ Ninh, mẹ Ninh Hạo Thiên; chủ mưu cướp Thần mạch.',['hoavuc'],[1,135,235,346]],
  ['dt','Tam Hoàng tử','Hoàng tử Đại Hạ ngang ngược; chết ở ch.224.',['hoavuc'],[131,134,211,224]],
  ['dt','Tiết Kính Thiên','Thần Long đại tướng quân Đại Hạ, liên thủ trấn áp cha Giang Thần.',['hoavuc'],[1,124]],
  ['dt','Mộ Dung Diên','Tiểu thư Mộ Dung gia kiêu ngạo.',['longvuc'],[295,304,307]],
  ['dt','Úy Trì Thiên','Người Úy Trì gia săn giết Giang Thần trong bí tàng; chết ở ch.423.',['longvuc'],[421,423]],
  ['dt','Quỷ Thương','Hạng 31 Thăng Long Bảng, Thông thiên tầng tám; bỏ mình ở ch.450.',['longvuc'],[425,427,450]],
  ['cg','Mặc Kiếm Phi','Nhân tài hiếm có, đệ tử của một vị Đại tôn giả.',['longvuc'],[298,304]]
];
const journey=[
  [1,'hoavuc','Trọng sinh vào thân Ninh Thần ở Nam Phong Lĩnh; Thần mạch đã bị cướp, cha bị giam.','ngungkhi'],
  [3,'hoavuc','Ninh phủ đổi thành Giang phủ.'],
  [19,'hoavuc','Đạt Tụ nguyên sơ kỳ, đủ tư cách vào Vấn Kiếm Môn.','tunguyen'],
  [33,'hoavuc','Giúp Giang gia chống ba thế lực xâm lấn Nam Phong Lĩnh.'],
  [42,'hoavuc','Rời núi lớn, xin gia nhập Thiên Đạo Môn.'],
  [70,'hoavuc','Vào nội môn Thiên Đạo Môn.'],
  [78,'hoavuc','Gặp sư tỷ Lý Tuyết Nhi ở Hóa long trì.'],
  [97,'hoavuc','Vào hoàng lăng Chu Tước quốc.'],
  [127,'hoavuc','Đột phá Thần du cảnh.','thandu'],
  [137,'hoavuc','Biết tới Thánh Viện; tìm cách giải độc cho mẹ.'],
  [177,'hoavuc','Vạn dặm độc hành cùng Bạch Linh.'],
  [184,'hoavuc','Tới Thương Mộc bộ lạc, giao giới Mộc vực.'],
  [224,'hoavuc','Giết Tam Hoàng tử Đại Hạ.'],
  [229,'hoavuc','Mẹ Cao Nguyệt lộ Thiên Phượng huyết thống.'],
  [236,'longvuc','Tới Thánh Viện ở Thánh Thành, Long vực.'],
  [246,'longvuc','Vào lớp đặc cấp của Thánh Viện.'],
  [253,'longvuc','Đột phá Thông thiên cảnh.','thongthien'],
  [274,'longvuc','Vào Anh Hùng Điện và Thời Quang Chi Điện.'],
  [345,'hoavuc','Trở về đánh Hắc Long thành.'],
  [351,'hoavuc','Cứu cha khỏi Hắc Long uyên, cả nhà đoàn viên.'],
  [364,'longvuc','Xác định quan hệ với sư tỷ; nàng về Linh vực giới.'],
  [374,'longvuc','Tốt nghiệp Thánh Viện.'],
  [405,'longvuc','Lập Thần Kiếm Hội.'],
  [410,'longvuc','Vào Thần Long bí tàng.'],
  [429,'longvuc','Tới Võ Hoàng Thành.'],
  [473,'longvuc','Đứng đầu Thăng Long Bảng.'],
  [489,'thienha','Qua truyền tống trận Thánh Viện; Anh Hùng Điện đã bị phá.'],
  [499,'thienha','Gia nhập Phi Long hoàng triều làm tướng.'],
  [523,'chientruong','Ra thiên ngoại chiến trường, gặp Ma tộc.'],
  [544,'chientruong','Đột phá Tôn giả, thành Võ Tôn.','voton'],
  [571,'chanvu','Tới Thủy Long Thành ở Chân Vũ Giới.'],
  [580,'chanvu','Đến Thần Võ Thành, đụng độ Thánh Võ Viện.'],
  [614,'chanvu','Chương cuối hiện có ở nguồn.']
];
const arts=[
  ['cp','Kim cương phục ma quyền','Quyền pháp Giang Thần dùng từ những chương đầu.',[9]],
  ['cp','Sát na kiếm pháp','Kiếm pháp nhanh như chớp, dùng suốt từ Hỏa vực tới Thánh Viện.',[187,217,280]],
  ['cp','Băng tâm quyết','Công pháp của Băng Linh tộc; Giang Thần nghiên cứu để phá tác dụng phụ cho sư tỷ.',[157,232]],
  ['cp','Huyền Vũ chân công','Công pháp Ninh Hạo Thiên tu để áp đảo Giang Thần.',[235,322,334]],
  ['hm','Thần mạch','Kinh mạch độc nhất vô nhị, tốt gấp trăm lần cha; bị họ Ninh cướp cho Ninh Hạo Thiên.',[1,331]],
  ['hm','Thiên Phượng huyết thống','Huyết thống của Cao gia; Giang Thần mang phượng huyết.',[229,259,268,376]],
  ['tt','Kiếm ý','Giang Thần lĩnh ngộ kiếm ý, sau đạt kiếm ý hoàn chỉnh.',[30,48,130]],
  ['tt','Phong tâm ý cảnh','Võ học ý cảnh, cùng Kim tâm ý cảnh bước vào nửa bước tiểu đạo.',[126,217]],
  ['bv','Xích tiêu kiếm','Kiếm của Giang Thần, chủ nhân gọi là Xích tiêu kiếm chủ.',[33,187]],
  ['bv','Như ý toán bàn','Bảo vật xuất hiện trong lần đối đầu với Ninh Hạo Thiên ở Thiên Đạo Môn.',[122,123]],
  ['bv','Thiên Đạo Chiến Hạp','Chí bảo lâu đời của Thiên Đạo Môn, tổ hợp tùy ý công năng các linh khí.',[337]],
  ['bv','Kim Long thẻ','Thẻ quý ở phòng đấu giá Thánh Thành.',[287,313]],
  ['bv','Phượng Linh Thạch','Đá liên quan tới Thiên Phượng huyết thống của Cao gia.',[373]],
  ['bv','Thần Long Châu','Báu vật các phe tranh trong Thần Long bí tàng.',[414]]
];
const st=STORIES.find(s=>s.id==='than-vo-chien-vuong');
st.people=people.map(([g,n,d,w,ch])=>({g,n,d,w,ch}));
st.journey=journey.map(([ch,w,d,r])=>({ch,w,d,r:r||null}));
st.arts=arts.map(([g,n,d,ch,rank])=>({g,n,d,ch,rank:rank||null}));
})();
