/* ===== Siêu Duy Thuật Sĩ — địa danh của từng thế giới =====
   Mỗi mục: [loại, tên, mô tả, [chương], thuộc, quy mô 1–5]. Lấy từ ~240 chương mẫu; gán thế giới theo ngữ cảnh. */
(function(){
const PL={
  cuutho:[
    ['quoc','Kim Tước đế quốc','Đế quốc nơi Anghel lớn lên; đang ở thế chiến tranh với nước láng giềng Heilan.',[1,826],null,5],
    ['quoc','Heilan vương triều','Nước láng giềng của Kim Tước; biên giới cách Gru trấn không xa. Hải Nguyệt thành phải đón đánh "Hải Lan".',[1,854],null,4],
    ['vung','Jamey hành tỉnh','Tỉnh ở góc xa trung tâm Kim Tước đế quốc, có Gru trấn.',[1],'Kim Tước đế quốc',3],
    ['thanh','Gru trấn','Trấn nhỏ nơi Anghel sống và học với đạo sư John; có nhà sàn của John.',[1,2,10],'Kim Tước đế quốc',2],
    ['gia','Pat gia tộc','Gia tộc tử tước giàu nhất Gru trấn; Moro cảm ơn Pat tử tước đã giúp mình đột phá.',[1,9],'Kim Tước đế quốc',2],
    ['gia','Bl·essed gia tộc','"Cột sống của Kim Tước đế quốc": mấy trăm năm ra ít nhất sáu đại tướng, nắm mạch quân sự.',[1],'Kim Tước đế quốc',4],
    ['gia','Grace gia tộc','Gia tộc quý tộc liên quan tới Nhã Mai hành tỉnh; nghe nói phía sau có bóng Phù thuỷ.',[826],'Kim Tước đế quốc',2],
    ['gia','Shannon vương tộc','Vương thất giữ « Triều Tịch giới bản đồ », cần máu vương tộc để mở.',[854,1050],null,3],
    ['thanh','Hải Nguyệt thành','Thành nơi con gái Rosello trở về đón đánh Hải Lan; Anghel từng tới đây.',[854,874],null,3],
    ['hiem','Watford ngục giam','Ngục Anghel đã vào xem trước khi tới Hải Nguyệt thành.',[874],null,1],
    ['hiem','Cửa Triều Tịch giới','Cánh cửa Mirafer vẽ ở cuối một lỗ thủng, phong ấn lối vào Triều Tịch giới.',[854],null,2]
  ],
  namvuc:[
    ['vung','Phồn đại lục','Đại lục chính của giới Phù thuỷ phía nam; Phù thuỷ ở đây cười cái tên "Cựu Thổ".',[9,10,58],null,5],
    ['tong','Dã Man hang động','Một trong những tổ chức hàng đầu Nam vực, phần lớn là Hắc vu sư; của Sanders, Flora, Nice, Wallace.',[47,122,123,250],'Phồn đại lục',5],
    ['thanh','Học Đồ trấn','Trấn của học đồ cạnh Dã Man hang động.',[138,145,2346],'Phồn đại lục',2],
    ['quoc','Hắc Ma quốc','Nước phàm nhân; mấy trăm thành trấn quanh Dã Man hang động bề ngoài thuộc Hắc Ma quốc.',[123,250],'Phồn đại lục',3],
    ['thanh','Dạ Ma thành','Thành của Hắc Ma quốc trong phạm vi Dã Man hang động; từng bị vật ký sinh Yểm giới phủ kín.',[314,410,709],'Phồn đại lục',2],
    ['dao','Huyễn Ma đảo','Đảo có đại trận của Sanders, nơi dựng vườn hoa vu thuật; sau thành thế lực của Anghel.',[154,314,371,1434],null,4],
    ['thanh','Thiên Không Cơ Giới thành','Thành máy móc trên trời có pháp tắc "Tịnh hóa"; trung tâm luyện kim Nam vực, có đấu giá lớn.',[154,282,442,666],null,5],
    ['tong','Sương Nguyệt liên minh','Liên minh xuất bản « vô ngần vị diện chinh hoang lục »; liên tục chinh phục vị diện mới.',[62,218,842,2592],null,5],
    ['tong','Đồng Thoại trấn','Liên minh tổ chức Phù thuỷ "kỳ lạ", chỉ là một khái niệm; căn nhà bánh kẹo nắm hơn năm thành Phù thuỷ mỹ thực Nam vực.',[47,282,364],null,4],
    ['quoc','Vĩnh Dạ quốc','Có Không Ngủ thành và Hối Dạ chi phong; vực Bóng Tối đang lan, thêm ba Mái Vòm Bóng Tối.',[442,698,709],null,4],
    ['thanh','Không Ngủ thành','Tổ chức Phù thuỷ gần Dã Man hang động nhất; không gian tường kép nhân tạo.',[442,666,709,890],'Vĩnh Dạ quốc',3],
    ['hiem','Hối Dạ chi phong','Đỉnh núi có truyền tống trận sang Cổ Mạn vương quốc.',[698],'Vĩnh Dạ quốc',2],
    ['quoc','Cổ Mạn vương quốc','Vương quốc có Hoàng Nữ trấn; nơi tìm thấy một thiếu niên bị thương.',[698,2506],null,3],
    ['thanh','Hoàng Nữ trấn','Trấn thuộc Cổ Mạn vương quốc.',[2506],'Cổ Mạn vương quốc',1],
    ['tong','Bạch san hô phù đảo học viện','Học viện trên đảo nổi; Moro đưa Ellen và Eileen về đây.',[9],'Phồn đại lục',3],
    ['thanh','Hoàng Hôn phòng đấu giá','Nơi đấu giá; mười năm qua đây là vụ lớn nhất, hơn chục Phù thuỷ chính thức có mặt.',[282],null,2],
    ['tong','Barbie phòng ăn','Quán của nữ Phù thuỷ duy nhất ở giới Phù thuỷ tổng hợp được Bóp Méo ba nguyên trùng.',[42,47],null,1],
    ['tong','Lâu Đài Đen','Thế lực dẫn đầu ký hữu nghị với Huyễn Ma đảo sau khi Anghel thành Phù thuỷ.',[1354,1377,1434],null,3],
    ['hiem','Kulaku tộc địa','Đất của Kulaku tộc trong yểm cảnh Đồng Thoại thế giới; tộc huấn cấm dẫn người vào.',[371,378,426],null,2],
    ['hiem','Đồng Thoại thế giới','Yểm cảnh nhiều tầng (ngoài, giữa, trong); quanh đó chỉ có tổ chức Yên tĩnh lĩnh.',[364,371,428],null,3],
    ['thanh','Nữ Vu trấn','Sanders vơ vét được nhiều vật phẩm từ đây.',[554],null,1],
    ['thanh','Ngỗng Trắng trấn','Trấn Blaze sống nhiều năm.',[2314],null,1],
    ['hiem','Phong Ngữ thung lũng','Nơi Anghel để lại tin nhắn "muốn đi Băng cốc".',[1114],null,1],
    ['vung','Biển Râu Cá Voi','Vùng biển xảy ra dị tượng mà thầy của Jetway ở xa vẫn cảm nhận được.',[1333],null,2]
  ],
  votanhai:[
    ['tong','Biển sâu chi ca','Tổ chức sống dưới Vô Tận Hải, không dự vào khai hoang vị diện.',[442],null,4],
    ['hiem','Bánh Răng hải uyên','Hải uyên trên tuyến thuyền men khung biển White Dwarf.',[714,794],null,3],
    ['vung','Vùng biển Ma Quỷ','Vùng biển có hòn đảo khép kín mà Man Thú số đi qua.',[794],null,2],
    ['vung','Đại lục Gợi Ý','Đích đến của chuyến đi biển.',[808],null,3]
  ],
  trieutich:[
    ['toc','Sinh vật nguyên tố','Triều Tịch giới đầy sinh vật nguyên tố, cần nhiều năng lượng nguyên tố để sống.',[854],null,4],
    ['vung','Bạch Bạch Vân Hương','Nơi các sinh vật Phong hệ.',[2218],null,3],
    ['tong','Nhu Phong điện hạ','Chủ Phong hệ được giao áp giải tinh linh Phong hệ tới.',[2202,2218],'Bạch Bạch Vân Hương',3],
    ['toc','Ma hỏa Midier','Sinh vật lửa; Anghel muốn biết thái độ của nó với loài người.',[2186],null,2]
  ],
  hante:[
    ['toc','Niệm sư','Người dùng niệm lực, chia theo sao; Tam tinh là mạnh nhất.',[74,75],null,3],
    ['quoc','Đường Hoàng vị diện','Vị diện sát vách Hante thế giới.',[282],null,3]
  ],
  bangkinh:[
    ['tong','Phù thuỷ chiếm cứ','Từ rất sớm đã có một nhóm Phù thuỷ vào chiếm giữ Băng Kính thế giới.',[2592],null,3],
    ['vung','Vùng đóng băng vĩnh cửu','Nay do Sương Nguyệt liên minh chiếm, có liên hệ với Băng Kính thế giới.',[2592],null,3]
  ],
  vucsau:[
    ['hiem','Băng cốc','Nơi đầy nguyền rủa, Phù thuỷ lăn lộn ở vực sâu ai cũng biết tên.',[970,1034,1114],null,4],
    ['thanh','Ác Ma thành','Thành của ác ma.',[986,1034,1066],null,3],
    ['hiem','Hàn cổ di chỉ','Di tích Anghel và Madeline tới; cứ điểm ở vực sâu rất khó dời.',[970],null,2],
    ['toc','Ngưng Uyên ma nhãn','Đại Ma Thần viễn cổ, có ước định với tàn khốc học giả.',[1098,1130],null,5],
    ['toc','Ác ma','Phần lớn ác ma ghét bỏ ác ma nửa dòng máu.',[1098],null,3]
  ],
  monggioi:[
    ['vung','Nơi hoang tàn của giấc mộng','Vùng mộng rộng lớn hơn vô số lần Không Ngủ thành.',[890,906,1866],null,5],
    ['thanh','Sơ Tâm thành','Thành Anghel chọn làm điểm đến qua cánh cửa mộng cảnh; có cư dân như Lisa, Lyon.',[906,938,1322,1562,1578,2234],'Nơi hoang tàn của giấc mộng',4],
    ['toc','Yêu Tinh nhất tộc','Tộc sinh ra từ Mộng giới.',[2890],null,2],
    ['hiem','Mỹ Mộng sơn','Núi trong Mộng giới.',[2906],null,2]
  ],
  kinhvuc:[
    ['hiem','Mộng chi tinh','Khe hở giữa Mộng giới, Yểm giới và Kính vực.',[3290],null,3]
  ],
  yemgioi:[
    ['thanh','Naraku thành','"Vườn Hoa mê cung" ở vùng ngoài cùng Yểm giới, vẫn còn Ma vật cấp Truyền Kỳ.',[112,554,882,2554],null,5],
    ['hiem','Huyền Ngục chi thê','Bậc thang ở Naraku thành; trên bàn đặt « kỳ điểm », dẫn đạo pháp mạnh nhất Nam vực theo Sanders.',[112,554],'Naraku thành',3],
    ['toc','Sinh vật Yểm giới','Ca ngợi Anghel, tưởng anh là "Maria"; từng gây tổn thương lớn cho Nam vực.',[882,2009],null,4]
  ]
};
const st=STORIES.find(s=>s.id==='sieu-duy-thuat-si'),SZ=(window.SIZES&&SIZES['sieu-duy-thuat-si'])||{};
st.worlds.forEach(w=>{w.places=(PL[w.id]||[]).map(([t,n,d,ch,inn,s])=>({t,n,d,ch,in:inn||null,s:s||SZ[w.id+'|'+n]||2}))});
})();
