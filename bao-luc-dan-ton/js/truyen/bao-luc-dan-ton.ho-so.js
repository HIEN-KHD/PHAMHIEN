/* ===== Bạo Lực Đan Tôn — nhân vật, hành trình, công pháp & bảo vật =====
   Định dạng như truyện mẫu; nhóm dùng chung PEOPLE_GROUPS, ARTS_GROUPS (js/chung.js). */
(function(){
const people=[
  ['gd','Trần Huyền','Nhân vật chính. Kiếp trước là "bất tử đan tôn" — Thần cấp luyện đan sư duy nhất Thiên Huyền đại lục, chết năm 28 tuổi vì nổ lò; trọng sinh vào thiếu niên hoàng cấp thất phẩm ở Phong Vân đại lục, nổi danh "bạo lực sát thần".',['phongvan','vocuc','tuchan','namphong','gialam','daotam','hacnham','vanthanh','thanhtien','vantien','thienvuc','trungvuc','tinhkhong'],[1,2,10,6918]],
  ['hn','Mộc Nhẹ Toàn','Đại biểu Vô Tâm Môn; trẻ mà đã vào linh cấp, từng chiếu cố Trần Huyền ở Bắc Thủy thành.',['phongvan'],[80]],
  ['hn','Hoàng Mộng Tịnh','Ngồi cạnh Trần Huyền ở cuộc so tài luyện đan; có các chương mang tên nàng.',['phongvan'],[173,182,220,586,756]],
  ['hn','Vũ Văn Thu','Đồng hành ở Hắc Nham thế giới; bị bắt rồi thức tỉnh. Trần Huyền vào Vạn Tiên đại lục cốt để tìm nàng.',['hacnham','vantien'],[2946,2950,3830,3850,5046,5099]],
  ['hn','Tím Quỳnh','Tu sĩ Tu chân giới; chứng kiến Trần Huyền vừa giáng xuống đánh tu sĩ Bạch Cốt tông.',['tuchan'],[807]],
  ['dh','Tiểu Hỏa Điểu','Linh thú ở trong nhẫn không gian của Trần Huyền; nhiều chương mang tên, có "thực lực chân chính".',['hacnham','vanthanh'],[3685,3710,3780,4280]],
  ['dh','Long Thiên Phá','Thần hồn ẩn trong người Trần Huyền, từng vượt thần đạo cửu trọng; truyền đạo thần hồn giúp đột phá.',['hacnham'],[3963,3965,4010,4349]],
  ['dh','Vũ Thần','Để lại thần thức mảnh nhỏ ở Già Lam giới, chọn Trần Huyền làm thiếu chủ.',['gialam'],[1613,1620,1628,1644]],
  ['dh','Lam Sơn','Tốn giá rất lớn để giữ Trần Huyền; sau thu đồ đệ.',['phongvan'],[115,130,434]],
  ['dh','Hồng Hoàng Nhi','Cô bé nhà họ Hồng; Trần Huyền chữa bệnh gia chủ, dạy dỗ Thiên Đan lão nhân.',['phongvan'],[692]],
  ['dh','Vương Luân','Đồng hành ở rừng Hắc Nham.',['hacnham'],[2355,2473,2600]],
  ['dh','Nam Cung Bạc','Thần hoàng một trọng của Nhạn Kiếm phái, đi cùng Trần Huyền tu luyện.',['hacnham'],[4474]],
  ['dh','Dương Văn','Bạn đồng hành ở Trung Vực đại lục.',['trungvuc'],[6423,6427,6441]],
  ['dh','Linh miêu','Linh thú tò mò, xuất hiện ở Vạn Tiên đại lục.',['vantien'],['~5910','~5980']],
  ['dt','Ngụy Thiên Hằng','Thuộc hạ Nhị hoàng tử Hạo Viêm; có chương đột phá riêng.',['phongvan'],[269,290]],
  ['dt','Triệu Chí Vân','Thủ lĩnh Xà Thần giáo, tu vi thần hồn; Trần Huyền phải lên thần hồn một trọng đỉnh mới đủ tư cách đánh.',['hacnham'],[3835,3860,3880]],
  ['dt','Lưu Văn Mạo','Đối thủ mạnh hơn thần đạo bình thường; bị bắt.',['hacnham'],[4315,4349,4386]],
  ['dt','Hàn Vân','Kiếm khách vây công, quyết dồn Trần Huyền vào tuyệt cảnh.',['trungvuc'],[6765]],
  ['dt','U Ảnh Thần Đế','Thủ lĩnh Ma Môn, khói đen bao trùm Hổ Cốc.',['trungvuc'],[6555]],
  ['dt','Thần La Tiên Tôn','Kẻ địch cuối, ma khí phá hủy mọi thứ; đối đầu ở ngôi sao chi cảnh.',['tinhkhong'],[6886,6915,6916,6917]],
  ['cg','Giang Hạ','Quẻ thần — đệ nhất cường giả Võ Đạo đại lục, sống mười vạn năm, kinh sợ sư phụ bí ẩn của Trần Huyền.',['daotam'],[1760]],
  ['cg','Thù Vạn Dặm','Môn chủ Thiên Ma Môn ở Nam Phong vực.',['namphong'],[1441]],
  ['cg','Mời Nguyệt lâu chủ','Chủ Mời Nguyệt lâu, kinh hãi trước Trần Huyền.',['vocuc'],[425,430]],
  ['cg','Kiều Lập Tiếu','Tông sư long văn của Long Văn tông.',['hacnham'],[3660,3663]]
];
const journey=[
  [1,'phongvan','Bất tử đan tôn nổ lò mà chết, trọng sinh ở Phong Vân đại lục; nuốt đan lên huyền cấp nhất phẩm.','huyencap'],
  [5,'phongvan','Một đêm từ huyền cấp nhất phẩm lên bát phẩm; luyện tam phẩm đan không cần đan lô.'],
  [10,'phongvan','Đêm máu ở thành chủ phủ Bắc Thủy thành; bắt đầu tên "bạo lực sát thần".'],
  [104,'phongvan','Nuốt Hỏa tinh đan, độ lôi kiếp lên Vương cấp.','vuongcap'],
  [326,'vocuc','Vào Vô Cực Giới — thế giới Thần cấp cường giả trong Bắc Hải Thần Điện.'],
  [605,'phongvan','Lực chiến hai đại phó điện chủ Ám Thần Điện.'],
  [664,'phongvan','Độ lôi kiếp đột phá Siêu thần cấp.','sieuthan'],
  [807,'tuchan','Giáng xuống Tu chân giới để tìm cơ duyên đột phá.'],
  [1375,'tuchan','Làm lĩnh chủ thành phụ thuộc với tu vi Hợp Thể kỳ.','hopthe'],
  [1441,'namphong','Tới Thiên Vực, Nam Phong vực.'],
  [1445,'namphong','Trở lại Thanh Trần tông của Thiên Linh tông.'],
  [1550,'gialam','Ở Tầm Thành, luyện Già Lam Kiếm cơ bản.'],
  [1620,'gialam','Thí luyện ở Già Lam kiếm vực, được gọi là thiếu chủ.'],
  [1641,'gialam','Tỉnh lại ở dị thế đại lục, rồi vào Hợp Quy tông.'],
  [1760,'daotam','Tu ở Tím La sơn, Võ Đạo đại lục.'],
  [1839,'daotam','Rời Mật Chi Sâm sau ba năm, trở về Đạo Tâm đại lục.'],
  [2295,'hacnham','Bị hắc động hút vào Hắc Nham đại thế giới.'],
  [2565,'hacnham','Đạt thần quân một trọng ở Lục Vũ thành.','thanquan'],
  [2771,'hacnham','Lên thần vương nhị trọng, tu cả yêu hồn và chân khí.','thanvuong'],
  [3880,'hacnham','Đạt thần hồn một trọng đỉnh, đủ sức đấu Triệu Chí Vân.','thanhon'],
  [4349,'hacnham','Đột phá thần đạo cảnh giới.','thandao'],
  [4599,'vanthanh','Tới Vạn Thành đại lục ở trung bộ khu vực.'],
  [4665,'vanthanh','Tu Cửu Long viêm hồn kiếm pháp trong Cửu Long tháp.'],
  [4828,'thanhtien','Tới Thành Tiên đại lục.'],
  [4943,'thanhtien','Thần tôn nhị trọng; khí linh Thiên Huyền long giới mở thông đạo.','thanton'],
  [5046,'vantien','Vào Vạn Tiên đại lục tìm Vũ Văn Thu.'],
  [5146,'vantien','Từ đệ nhị trọng thiên trở về.'],
  ['~5969','vantien','Mới vào thần long cảnh giới.','thanlong'],
  ['~6126','thienvuc','Tới Tiên Lân thiên vực.'],
  [6359,'thienvuc','Vượt chín lượt thiên kiếp, thành thần long phá thần vô địch.'],
  [6390,'thienvuc','Vực chủ Diệt Ma thiên vực chết.'],
  [6423,'trungvuc','Tới Trung Vực đại lục cùng Dương Văn.'],
  [6917,'tinhkhong','Dung nhập ngôi sao chi cảnh chống ma khí Thần La Tiên Tôn.'],
  [6918,'tinhkhong','Đại kết cục: "Tinh không chúa tể".','tinhkhong']
];
const arts=[
  ['cp','Luyện đan thuật','Đan thuật kiếp trước giúp người khởi tử hồi sinh; nền tảng mọi lần đột phá.',[1,4,5]],
  ['cp','Đại mãng phệ hồn quyết','Võ kỹ cực mạnh Trần Huyền cảm nhận được.',[990]],
  ['cp','Già Lam Kiếm','Kiếm pháp/kiếm của Già Lam giới, luyện từ cơ sở.',[1550,1620]],
  ['cp','Cửu Long viêm hồn kiếm pháp','Tu trong Cửu Long tháp.',[4665]],
  ['cp','Thiên thần kiếm hỏa tâm pháp','Tâm pháp có chương riêng.',[4923]],
  ['cp','Thật thiên hỏa tiên kiếm pháp','Kiếm pháp đột phá ở Vạn Tiên đại lục.',['~5992']],
  ['tt','Yêu hồn','Tu song song với chân khí ở Hắc Nham thế giới.',[2600,2832]],
  ['tt','Thần hồn','Long Thiên Phá truyền đạo; lục phẩm, cửu phẩm Chu Tước thần hồn.',[3965,4700,4840]],
  ['tt','Thần ma chi mắt','Đồng thuật của con Thù Vạn Dặm, kết hợp công pháp Ma môn.',[1441]],
  ['th','Tím tâm viêm','Ngọn lửa có tên chương "thông minh tím tâm viêm".',[180]],
  ['th','Thiên hỏa','Nhiều chương về thiên hỏa và thời không ba động.',[6540,6870]],
  ['bv','Bất diệt đỉnh','Đỉnh luyện của Trần Huyền, luyện cả hung thú.',[290,664]],
  ['bv','Sơn hải đồ','Bảo vật có chương riêng.',[900]],
  ['bv','Thiên huyền tháp','Bảo vật có chương riêng.',[600]],
  ['bv','Cửu Long tháp','Tháp chứa lực lượng thần kiếm.',[4665]],
  ['bv','Thiên Huyền long giới','Pháp bảo từ trăm vạn năm trước, khi quy tắc thế giới tan vỡ; có khí linh.',[4943,5214]],
  ['bv','Hồng long nhẫn','Nhẫn vàng đỏ trong đồn đại.',['~5770']]
];
const st=STORIES.find(s=>s.id==='bao-luc-dan-ton');
st.people=people.map(([g,n,d,w,ch])=>({g,n,d,w,ch}));
st.journey=journey.map(([ch,w,d,r])=>({ch,w,d,r:r||null}));
st.arts=arts.map(([g,n,d,ch,rank])=>({g,n,d,ch,rank:rank||null}));
})();
