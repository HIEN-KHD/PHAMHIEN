/* ===== Siêu Duy Thuật Sĩ — nhân vật, hành trình, công pháp & bảo vật =====
   Định dạng như truyện mẫu; nhóm nhân vật/công pháp dùng chung PEOPLE_GROUPS, ARTS_GROUPS. */
(function(){
const people=[
  ['gd','Anghel','Nhân vật chính. Thiếu gia quý tộc ở Gru trấn, theo học đạo sư John; được Moro phát hiện, theo Sanders vào giới Phù thuỷ. Có thiên phú đặc biệt liên quan tới Yểm giới.',['cuutho','namvuc','yemgioi','monggioi','vucsau','trieutich'],[1,10,62,153,1423]],
  ['gd','Lyon','Anh trai Anghel; giận vì Anghel tin phục, bái John làm đạo sư.',['cuutho'],[1,2]],
  ['gd','John','Đạo sư của Anghel, người "thời không khách" tới từ Địa Cầu; nghiên cứu nhiều năm số liệu vật lý không khớp với thế giới này.',['cuutho'],[2,3,5,6,10]],
  ['dh','Moro','Học đồ cấp 3 gần tám mươi tuổi; người cho Anghel biết về Phù thuỷ ở Gru trấn.',['cuutho','namvuc'],[9,10,26]],
  ['cg','Sanders','Thầy của Anghel, Phù thuỷ cấp 2 của Dã Man hang động; thuật pháp liên hệ nhiều với Yểm giới, đưa Anghel vào Yểm giới.',['namvuc','yemgioi','trieutich'],[42,47,62,88,112,2490]],
  ['dh','Flora','Học trò của Sanders, đồng hành từ Cựu Thổ về Dã Man hang động.',['namvuc','yemgioi'],[47,88,112,154]],
  ['cg','Nice','Phù thuỷ Dã Man hang động, chấm khảo hạch người thiên phú; giải thích thế giới dưới mặt kính.',['namvuc'],[122,123,2154]],
  ['cg','Wallace','Phù thuỷ Dã Man hang động, Flora gọi là "già mà không đứng đắn".',['namvuc'],[88,122,1978]],
  ['dh','Toby','Con chim đi theo Anghel, mặc đồ "tao bao"; được tính như có thực lực Phù thuỷ chính thức.',['namvuc','monggioi'],[42,58,938,1754]],
  ['dh','Nausicaa','Người thiên phú cùng khóa; thành học đồ cấp 1 trước Anghel.',['namvuc'],[122,145,442]],
  ['dh','Sarum','Bạn cùng khóa, sinh ra Ma nguyên trước Anghel.',['namvuc'],[122,145,1530]],
  ['dh','Qi Li','Học đồ cấp 2 hệ Hỏa, cùng tuổi Anghel nhưng vào giới Phù thuỷ sớm hơn bảy năm.',['namvuc','votanhai'],[458,490,1530]],
  ['dh','Ám Ảnh','Ma ngẫu cấp Phù thuỷ có tư duy, ký khế ước với Anghel; dẫn vào Đồng Thoại thế giới.',['namvuc'],[364,371,428]],
  ['dh','Babaya','Người thiên phú Anghel giám định được; được mong là thiên phú huyết mạch để giải quyết huyết mạch Kura Kuka tộc.',['namvuc'],[634,695,1274]],
  ['cg','Felicia','Phù thuỷ mỹ thực; từng đi Quang Diệu giới, mời Đại Vu sư tiên đoán sang Đường Hoàng vị diện tìm Greya.',['namvuc','hante'],[282,394,428]],
  ['cg','Greya','Phù thuỷ bước vào Chân Tri nhờ sáng sinh thuật; Sanders từng vào Yểm giới tìm nhục thân của Greya.',['namvuc','yemgioi'],[42,282,1333,1610]],
  ['cg','Frost','Nhận xét Anghel nhìn thấy con đường Chân Tri ngay lúc đột phá.',['namvuc'],[1412,1434]],
  ['dh','Madeline','Cùng Anghel đi vực sâu, qua cứ điểm và Hàn cổ di chỉ.',['vucsau'],[954,962,970]],
  ['dh','Shannon','Người của vương tộc Shannon, mặc giáp ra trận ở Hải Nguyệt thành chống Hải Lan.',['cuutho'],[826,854,874]],
  ['cg','Mirafer','Phù thuỷ ma họa đã tìm ra Triều Tịch giới, vẽ cánh cửa và « Triều Tịch giới bản đồ ».',['cuutho','trieutich'],[854,1050]],
  ['cg','Rhine','Các hạ cùng Anghel bàn chuyện Triều Tịch giới, quan sát quyền năng giao phó.',['trieutich'],[2298]],
  ['cg','Trí giả chúa tể','Trao chìa khóa cho Anghel trước khi đi.',['kinhvuc'],[2698,2858]],
  ['cg','Barzel','Truyền kỳ Vu sư "vặn vẹo", soạn « vị diện chinh phạt lợi và hại ».',['namvuc'],[10,62]],
  ['dt','Ngưng Uyên ma nhãn','Đại Ma Thần viễn cổ của vực sâu; tàn khốc học giả vì ước định với nó mà cản Anghel.',['vucsau'],[1098,1130]],
  ['dt','Julington','Học đồ cấp 3 từng mang mỹ nữ tới làm quen Anghel; tâm địa hẹp hòi.',['namvuc'],[2346]]
];
const journey=[
  [1,'cuutho','Thiếu gia Anghel ở Gru trấn, học với đạo sư John.','thienphu'],
  [9,'cuutho','Gặp học đồ Moro, biết về Cựu Thổ đại lục và giới Phù thuỷ.'],
  [26,'cuutho','Gặp Tiên Huyết nữ vu; cưỡi Vân kình rời đi.'],
  [47,'namvuc','Gặp Sanders và Flora của Dã Man hang động.'],
  [90,'yemgioi','Cùng Sanders vào Yểm giới bằng linh hồn tìm dẫn dắt pháp.'],
  [112,'namvuc','Trở về giới Phù thuỷ, mang ra Lẫm Dạ dược tề và đoản trượng đen.'],
  [122,'namvuc','Khảo hạch người thiên phú ở Dã Man hang động; Sanders nhận làm học trò.'],
  [153,'namvuc','Ma nguyên thành hình — thành học đồ cấp 1.','hocdo1'],
  [154,'namvuc','Bước vào vòng trong Huyễn Ma đảo.'],
  [172,'namvuc','Thành học đồ luyện kim sơ cấp.'],
  [330,'namvuc','Ba ngày lên học đồ cấp 2.','hocdo2'],
  [364,'namvuc','Cùng Ám Ảnh vào yểm cảnh Đồng Thoại thế giới, tới tộc địa Kulaku.'],
  [572,'namvuc','Dự đấu giá hàng đầu Nam vực, bán huyết mạn.'],
  [709,'namvuc','Giải quyết vật ký sinh Yểm giới ở Dạ Ma thành.'],
  [808,'votanhai','Vượt biển tới Đại lục Gợi Ý.'],
  [854,'cuutho','Tìm ra cánh cửa Triều Tịch giới Mirafer vẽ.'],
  [906,'monggioi','Lần đầu vào Mộng giới, chọn Sơ Tâm thành.'],
  [970,'vucsau','Cùng Madeline vào vực sâu, tới Hàn cổ di chỉ và Băng cốc.'],
  [1130,'vucsau','Chứng kiến Ma Thần đánh cờ.'],
  [1423,'namvuc','Ma nguyên hóa tuyền — đột phá Phù thuỷ chính thức, nhìn thấy cửa Chân Tri.','pt1'],
  [1434,'namvuc','Huyễn Ma đảo mạnh thêm, Lâu Đài Đen ký hữu nghị.'],
  [2170,'trieutich','Ở Triều Tịch giới, đối đầu Dangros.'],
  [2554,'yemgioi','Tìm hiểu bí văn Noah nhất tộc, nghi liên quan tới Augustine ở Naraku thành.'],
  [2592,'bangkinh','Nghe về Băng Kính thế giới.'],
  [2858,'kinhvuc','Nhận chìa khóa của trí giả chúa tể.'],
  [3290,'monggioi','Dùng quyền năng mộng cảnh gọi kẻ đuổi mộng Alan.']
];
const arts=[
  ['cp','Kỳ Điểm Tán Xạ minh tưởng pháp','Minh tưởng pháp Anghel tu ("điểm đơn tản ra"), có khác biệt riêng.',[112,1423]],
  ['cp','Montos tám mặt dẫn dắt pháp','Dẫn dắt pháp Sanders định cho Anghel xin khi không mang được bản ở Yểm giới ra.',[112]],
  ['cp','« Kỳ điểm »','Dẫn đạo pháp Sanders cho là mạnh nhất Nam vực, đặt trên Huyền Ngục chi thê ở Naraku thành.',[554]],
  ['cp','Tinh sương minh tưởng pháp','Một bản minh tưởng pháp.',[1267]],
  ['tt','Ảo thuật (huyễn thuật)','Con đường chính của Anghel: ảo thuật cấp 1, huyễn cảnh, cả trong yểm cảnh.',[244,364,808]],
  ['tt','Ma Lực chi thủ','Thuật pháp có hai bản nâng cấp.',[170]],
  ['tt','Bài trừ mê chướng','Ảo thuật phụ trợ khám phá huyễn thuật, cần học đồ cấp 2.',[10]],
  ['tt','Con mắt của Nalda','Thuật giám định; Anghel nắm sơ bộ rất nhanh, Muse mất một tháng.',[666,698]],
  ['tt','Luyện kim','Anghel thành học đồ luyện kim sơ cấp, về sau giám định, luyện chế.',[172,2952]],
  ['hm','Thiên phú Linh Hồn hệ','Sanders nghi Anghel có thiên phú thứ hai thuộc hệ Linh Hồn; vào Yểm giới bằng linh hồn.',[106,218]],
  ['hm','Thân phận "Maria"','Sinh vật Yểm giới nhận nhầm Anghel là Maria và đều không thù địch.',[882,2079]],
  ['bv','Lưu Ly châu','Viên kết tinh hình bầu dục, John cho là đồ của Địa Cầu.',[6]],
  ['bv','Lẫm Dạ dược tề','Hai bình mang ra từ Yểm giới.',[112]],
  ['bv','Đoản trượng đen','Vật đặc biệt mang ra từ Yểm giới.',[112]],
  ['bv','Thẻ vàng Barbie phòng ăn','Kết tình nghĩa với chủ quán, có lợi khi thành Phù thuỷ chính thức.',[47]],
  ['bv','Hồn Châu','Viên linh hồn bổ sung linh hồn chi lực; có loại làm từ linh hồn bị đại trận hấp thu.',[394,554,634]],
  ['bv','Yểm thạch','Đá tạo huyễn cảnh không cần ma văn, liên quan tới vị diện khác.',[26]],
  ['bv','Linh động dược tề','Dược tề hỗ trợ biển tinh thần khi đột phá.',[1422,1423]],
  ['bv','Kael chi thư','Sách viết vận mệnh thiên chương bao gồm vực sâu, giới Phù thuỷ, Triều Tịch giới.',[2266,2282,2842]],
  ['bv','Ma tinh','Tiền tệ của Phù thuỷ; Moro góp chưa tới 100 viên.',[10,572]]
];
const st=STORIES.find(s=>s.id==='sieu-duy-thuat-si');
st.people=people.map(([g,n,d,w,ch])=>({g,n,d,w,ch}));
st.journey=journey.map(([ch,w,d,r])=>({ch,w,d,r:r||null}));
st.arts=arts.map(([g,n,d,ch,rank])=>({g,n,d,ch,rank:rank||null}));
})();
