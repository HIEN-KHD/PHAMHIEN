/* ===== Kình Thiên Kiếm Đế — địa danh của từng thế giới =====
   Mỗi mục: [loại, tên, mô tả, [chương], thuộc, quy mô 1–5] */
(function(){
const PL={
  thanvo:[
    ['quoc','Thần Võ quốc','Một trong Lĩnh Đông bảy trăm quốc; có quân đoàn tinh nhuệ, sau này đánh tới Bắc Hoang vực.',[21,301,2401],null,4],
    ['thanh','Linh Tê thành','Quê Lâm Bạch; Lâm gia sống ở đây, Lâm Bạch và Lâm Tử Nhi được gọi là "Kim đồng ngọc nữ".',[1,21],'Thần Võ quốc',2],
    ['gia','Lâm gia','Gia tộc của Lâm Bạch; cha là tiền nhiệm gia chủ Lâm Đạc bỏ đi không lời từ biệt.',[1,981],'Linh Tê thành',2],
    ['tong','Linh Kiếm tông','Tông kiếm tu; trăm năm trước đệ nhất kiếm tu Lĩnh Đông là Kiếm Huyền xuất từ đây. Lâm Bạch vào tông.',[41,121,481],'Thần Võ quốc',4],
    ['tong','Thương Hải Vân Thai cung','Một trong tứ đại tông của Thần Võ quốc; Lâm Bạch thề giết Triệu Hiển Thánh ở đây.',[141,241,661],'Thần Võ quốc',3],
    ['tong','Liệt Hỏa cung','Tông tham gia săn bắn ở Tề Thiên sơn mạch.',[161,241,641],'Thần Võ quốc',3],
    ['tong','Vô Phong môn','Tổ chức sát thủ, có kim bài sát thủ La Thất Tinh.',[261,281,641],null,3],
    ['tong','Kình Thiên minh','Thế lực ở quê, bị Lâm Bạch tiêu diệt (ch.20).',[5,20],'Linh Tê thành',2],
    ['tong','Phong Thần tông','Có chí bảo Võ Ý Thần Bi, khắc thần thông võ kỹ.',[161,181],null,3],
    ['quoc','Đại Nguyệt quốc','Có Nguyệt Thần đại trận chịu được Thần Đan cảnh đánh ba ngày; Thánh Nguyệt tông ở đây.',[121,401,481],null,3],
    ['quoc','Thiên Kiếm vương triều','Một trong tứ đại vương triều Lĩnh Đông; có Danh Kiếm sơn trang của Kiếm Nhược Hàn.',[221,341,501],null,4],
    ['quoc','Thánh Dạ vương triều','Đệ nhất vương triều Lĩnh Đông; chủ là Diệp Vô Hoan.',[501],null,5],
    ['vung','Đông Hải','Biển ngoài phía đông Thần Võ quốc; bát đại thế lực do Cuồng Sa môn, Đào Hoa đảo dẫn đầu.',[221,321,341],null,4],
    ['hiem','Linh Tuyền Hải','Nơi phong ấn đại ma bị đánh thủng; linh khí rò ra giúp người tu một tháng từ Huyền Võ lên Thiên Võ.',[221,321,361],'Đông Hải',3],
    ['hiem','Tề Thiên sơn mạch','Nơi tứ đại tông săn bắn yêu thú.',[241],'Thần Võ quốc',2],
    ['hiem','Kiếm Thánh sơn','Núi có kiếm ý, nơi luận võ kiếm tu.',[581],null,2]
  ],
  thantich:[
    ['tong','Thần Tích lĩnh','Năm núi, ba vị chưởng giáo chí tôn; chiếm giữ di tích Xích Tiên tông.',[501,761,1921],null,5],
    ['tong','Kiếm Đạo viện','Đạo viện của kiếm tu; Lâm Bạch cầm thư mời tới báo danh.',[601,761,821],'Thần Tích lĩnh',3],
    ['tong','Đan Đạo viện','Viện trưởng Lô Thanh Vũ là luyện đan sư bát phẩm duy nhất trên Thần Tích lĩnh.',[821,841,861],'Thần Tích lĩnh',3],
    ['tong','Quyền Đạo viện','Đạo viện quyền tu.',[721,761,1021],'Thần Tích lĩnh',2],
    ['tong','Thiên Bảo lâu','Thương hội lớn; lầu chủ Cảnh Hạo, Tô Tiên Mị là tuần tra sứ.',[1061,1341,1381],null,3],
    ['vung','Hồng Hoang giới','Đất hoang ngăn Thần Tích lĩnh với Lĩnh Nam; "giết người là vô tội", cao thủ Liệp Nhân Bảng săn Lâm Bạch ở đây.',[981,1001,1661],null,4],
    ['hiem','Thập Vạn Đại Sơn','Dãy núi có Thần Miếu biết bí mật võ hồn; yêu thú Nhân Đan cảnh.',[501,521,1241],'Hồng Hoang giới',4],
    ['bau','Tạo Hóa Thần Cung','Cung của Xích Tiên tông; Lâm Bạch thành chủ nhân.',[1201,1921],null,2],
    ['thanh','Thiên Dung thành','Thành Đan Đạo viện về thu đồ đệ.',[721,781,821],null,2],
    ['hiem','Độc Uyên','Nơi Ngũ Độc Thánh Chủ nuôi độc vật.',[1241],null,2]
  ],
  linhnam:[
    ['tong','Thông Thiên Kiếm phái','Kiếm phái lớn của Lĩnh Nam; chỉ nội môn mới là truyền nhân thật.',[1361,1381,1401],null,5],
    ['thanh','Tử Kim thành','Thành năm năm thu đồ đệ một lần — thịnh hội của Nhân tộc Lĩnh Nam; có truyền tống tới Dạ Nha sơn mạch.',[1321,1341,1361],null,3],
    ['quoc','Phi Vân vương triều','Vương triều nhỏ yếu, đi qua Hồng Hoang giới là tới.',[1281,1301,1341],null,3],
    ['thanh','Kiếm Ngân thành','Đệ nhất thành kiếm tu của Phi Vân vương triều.',[1301],'Phi Vân vương triều',2],
    ['quoc','Vân Thiên vương triều','Có Vô Cực sơn và sát thủ Thiên Sát các.',[1321],null,3],
    ['tong','Thiên Sát các','Tông sát thủ, có tiền là dám giết bất kỳ ai.',[1321],'Vân Thiên vương triều',2],
    ['quoc','Hãn Hải yêu quốc','Vương triều Yêu tộc; Lâm Bạch tu ở đây vì không thiếu yêu huyết.',[1401,1421,1681],null,4],
    ['tong','Tiên Động sơn','Có bảy mươi hai kiếm tu nổi danh khắp Lĩnh Nam.',[1421,1481,1681],null,3],
    ['hiem','Dạ Nha sơn mạch','Nơi truyền tống ngẫu nhiên từ Tử Kim thành.',[1341,1361],null,2],
    ['thanh','Hải Kiệt thành','Thành ở Lĩnh Nam.',[1521,1561,1581],null,2]
  ],
  dongchau:[
    ['tong','Đông Châu học cung','Tông mạnh nhất Đông châu, thu đệ tử từ vạn vực; ngoại môn có mấy trăm vạn người.',[1766,2321,2581],null,5],
    ['tong','Trật Tự Thần Đình','Ở Trật Tự Thần Sơn giữa Đông Châu học cung; có chín trưởng lão.',[2241,2581],'Đông Châu học cung',4],
    ['vung','Đông viện','Một viện của học cung, có các gia tộc cổ như Cổ gia.',[1981,2181,2241],'Đông Châu học cung',3],
    ['vung','Nam viện','Viện có Dưỡng Long đảo, Vạn Tinh đảo.',[2001,2061,2281],'Đông Châu học cung',3],
    ['dao','Dưỡng Long đảo','Đảo của Lâm Bạch ở Nam viện; từng bị đánh thành phế tích.',[2061,2161,2281],'Nam viện',2],
    ['gia','Cổ gia','Gia tộc cổ ở Đông viện, giữ Cổ Kim Lâu; tộc trưởng là trưởng lão Trật Tự Thần Đình.',[2241,2261],'Đông viện',3],
    ['bau','Cổ Kim Lâu','Nơi Cổ gia tụ kỳ trân dị bảo; một Vấn Đỉnh cảnh lẻn vào bị vây chết.',[2261],'Cổ gia',2],
    ['vung','Thái Linh vực','Vực hỗn loạn, cường hào cát cứ; Lâm Bạch tới qua truyền tống trận.',[1834,1841,1961],null,3],
    ['vung','Thương Hùng vực','Vực tổn thất nguyên khí, chỉ còn ba trăm suất bái sư.',[1861],null,2],
    ['vung','Thần Long vực','Một trong cửu đại vực, mỗi năm hơn một vạn suất bái sư.',[1851,1861],null,3],
    ['vung','Giang Hải vực','Một trong cửu đại vực; Khương gia là đệ nhất gia tộc.',[1861,2621],null,3],
    ['vung','Bắc Hoang vực','Một trong 180 vực góc nam, cằn cỗi, cao nhất chỉ Dương Thần.',[2401],null,2],
    ['thanh','Trích Tiên thành','Thành có hồ, nơi Lâm Bạch trấn áp hơn bảy trăm thiên kiêu.',[1861,1881,1941],'Thái Linh vực',2],
    ['vung','Thần Ma Hải','Biển ngoại môn có mười đại hải tặc.',[2221],'Đông Châu học cung',3],
    ['hiem','Băng Phong sơn mạch','Nơi tranh Băng Huyết Tham.',[1721],null,2],
    ['tong','Ma tông','Thế lực ma đạo đối đầu học cung.',[1921,2261,2321],null,3]
  ],
  tuchau:[
    ['quoc','Trung Ương Thánh Quốc','Nơi võ đạo hưng thịnh nhất Man Cổ; có Trảm Long Ty và Vĩnh Dạ phủ.',[321,2661,3301],null,5],
    ['tong','Vĩnh Dạ phủ','"Tên bắn lén" của Thánh Quốc, khác Trảm Long Ty là "đao trên mặt bàn".',[3601],'Trung Ương Thánh Quốc',3],
    ['vung','Bắc châu','Bắc châu vạn thành; mạnh nhất Kiếm Thần gia tộc rồi tới Lâu Nam cổ quốc.',[2661,2761,2854],null,4],
    ['gia','Kiếm Thần gia tộc','Thế lực lớn nhất Bắc châu.',[2661,2761,2801],'Bắc châu',4],
    ['thanh','Thiên Kiếm thành','Nơi luận võ hằng năm của võ giả Bắc châu và Nam châu.',[2661,2761,2781],'Bắc châu',3],
    ['vung','Nam châu','Nam châu vạn bộ.',[2661,2903,3148],null,4],
    ['gia','Độc Thần gia tộc','Thế lực võ giả Man Cổ ngại trêu nhất; có Vạn Độc sơn mạch.',[2981,3001,3101],'Nam châu',4],
    ['hiem','Vạn Độc sơn mạch','Đất của Độc Thần gia tộc; phải có lục đan mới sống được.',[3101,3121,3161],'Độc Thần gia tộc',3],
    ['tong','Thần môn','Từ thời hồng hoang đã là công địch của Nam châu.',[3021,3061,3148],'Nam châu',3],
    ['vung','Tây châu','Tây châu vạn phật — thánh thổ Phật giáo.',[2661,2761],null,4],
    ['thanh','Hắc Thủy thành','Thành có Hắc Thủy Thần Lôi Quyết; Đường gia tranh soái kỳ.',[2661,2681,2701],null,2],
    ['quoc','Đại Vu vương triều','Bị Chiêu Nguyệt cùng Ma tông tiến đánh.',[2621,2861,2881],null,3],
    ['tong','Bạch Long tông','Có tam đại thần điện như Thương Sinh điện; mở Bạch Long bí cảnh.',[3221,3261],null,3],
    ['hiem','Hàng Thế sơn','Núi nối Man Cổ với Cổ Tiên tông ở thượng giới.',[4021],null,3]
  ],
  linhgioi:[
    ['tong','Cổ Tiên tông','Tông ở thượng giới nối với Hàng Thế sơn; có người hạ giới xuống Man Cổ.',[4021],null,5],
    ['tong','Ly Hận Thiên','Đứng đầu Linh giới thập đại ma tông.',[6917],null,4]
  ],
  yeugioi:[
    ['toc','Yêu tộc','Không tát ao bắt cá nên Yêu giới còn nhiều linh dược.',[7081],null,4]
  ],
  thuykinh:[
    ['vung','Khu giao dịch','Chợ, hội đấu giá, thương hội cho đệ tử Thiên Thủy tông.',[4921],null,3],
    ['vung','Thủy Kính Hải','Biển có tam đại Yêu tộc bám vào Thiên Thủy tông.',[4981,5521,5581],null,3]
  ],
  madong:[
    ['tong','Vĩnh Hằng Ma Tông','Tông Lâm Bạch đầu quân dưới tên Thanh La.',[4141,4201,4261],'Hằng Châu',4],
    ['vung','Hằng Châu','Châu có tám đại hào môn, Hằng Châu minh.',[4261,4561],null,3],
    ['tong','Hằng Châu minh','Liên minh hào môn Hằng Châu.',[4261,4561],'Hằng Châu',3],
    ['thanh','Trảm Sơn thành','Thành đầu tiên Lâm Bạch dừng chân ở Ma giới.',[4081],null,2],
    ['vung','Vân Lĩnh','Hai mươi bảy châu bị Vân Lĩnh Lý gia chiếm.',[4621,4741],null,3],
    ['gia','Vân Lĩnh Lý gia','Có kiếm trấn tộc do tông sư Đông Vực luyện.',[4621,4741,4861],'Vân Lĩnh',3],
    ['quoc','Sở quốc','Một trong mười sáu thế lực mạnh của Ma giới, ngũ gia thất tông.',[4861,5161,5521],null,5],
    ['vung','Khắc Châu','Châu của Sở quốc nơi Lâm Bạch lập danh.',[4861,5161,5221],'Sở quốc',3],
    ['thanh','Thanh Liên thành','Nơi các đệ tử kiệt xuất ngũ gia thất tông ở lại.',[4861,5161,5221],'Khắc Châu',3],
    ['tong','Thiên Thủy tông','Tông của Lâm Bạch ở Sở quốc; Bách Thánh sơn là nơi lão tổ tọa hóa.',[4921,4981,5041],'Sở quốc',4],
    ['tong','Thiên Địa môn','Tông nổi lên sau trận diệt Cửu U Ma Cung.',[5041,5281,5521],'Sở quốc',4],
    ['tong','Tề Thiên tông','Một trong tứ đại thế lực Đông Vực.',[5521,6028],'Sở quốc',4],
    ['tong','Trần Vương điện','Điện của Trần Vương điện hạ, giao nhiệm vụ cho đệ tử ngũ gia thất tông.',[5161,5221,6121],'Sở quốc',3],
    ['thanh','Phong Bạo thành','Thành nơi Tần gia, Triệu gia tranh đoạt khi Triệu gia phản Thiên Thủy tông.',[5521],'Sở quốc',3],
    ['tong','Huyết Thần giáo','Không phải đối thủ của Sở quốc.',[5161],null,2],
    ['dao','Hải Thú đảo','Có Tử Vong Thiên Đảo cấm kỵ.',[5101],null,2]
  ],
  mabac:[
    ['vung','Bắc Vực','Vực đem quân đánh Sở quốc; có bốn đại tông.',[5940,6301,6392],null,5],
    ['tong','Luyện Thi tông','Một trong bốn đại tông Bắc Vực.',[6301,6421],'Bắc Vực',3],
    ['tong','Luyện Thần tông','Tông Bắc Vực.',[6421,7201],'Bắc Vực',3],
    ['tong','Luyện Hồn tông','Tông Bắc Vực.',[6421],'Bắc Vực',2],
    ['vung','Nam Cương Trùng Cốc','Có 75 loại vương độc như Thần Ma Kiếp.',[5705,6061,6601],null,4],
    ['vung','Tây Vực','Bảy mươi hai nước; Vân quốc thái tử Vân Thiên Cơ.',[6303,6361,6601],null,4],
    ['vung','Nam Vực','Vực có các tông Nam Vực.',[6181,6241,6601],null,3],
    ['tong','Thiên Tiên tông','Tông có tông chủ áo bào đen.',[5941,6301,6721],null,3],
    ['tong','Thánh Liên cung','Lão tổ chặn tiền bối Thiên Đạo đại tộc từ Bắc Vực.',[6061,6121,6541],null,3],
    ['tong','Nguyệt Cung','72 cung, có hoa khôi Tinh Dạ cô nương.',[6661,6721],null,3],
    ['tong','Thanh Liên tông','Tông Lâm Bạch tới bái phỏng.',[6778,6781],null,2],
    ['thanh','Long Sơn thành','Có truyền tống đi Tây Vực và Nam Vực.',[6601],null,2]
  ],
  liepgioi:[
    ['hiem','Địa tâm thế giới','Thế giới dưới lòng đất Liệp giới.',[6241],null,3],
    ['vung','Linh Dược viên','Vườn linh dược hoàng tộc Sở quốc mở dưới đất.',[6241],'Địa tâm thế giới',2]
  ],
  cuuu:[
    ['tong','Cửu U Ma Cung','Như một cương vực; chín đại thần điện là các tông đỉnh tiêm.',[6901,6961,7081],null,5],
    ['thanh','Cửu U thành','Chín cột đá cao đỡ chín đại thần điện.',[6897,6901,7141],'Cửu U Ma Cung',4],
    ['vung','Dao Đài Thiên Châu','Lãnh thổ phì nhiêu nhất cương vực ma cung; Đoan Mộc gia tộc.',[7741],null,4],
    ['gia','Đoan Mộc gia tộc','Gia tộc ở Dao Đài Thiên Châu.',[7741],'Dao Đài Thiên Châu',3],
    ['tong','Thất Dạ Thần Tông','Nội chiến do Cửu U Ma Cung và Bắc Vực mưu tính.',[6841,6961,7141],null,4],
    ['tong','Thuần Dương tông','Tông dự mưu nội chiến Thất Dạ.',[6961,7141,7201],null,3],
    ['tong','Phượng Hoàng cốc','Tông dự mưu nội chiến Thất Dạ.',[6961,7141,7201],null,3],
    ['tong','Phiên Thiên tông','Chiến trường chính có thể ở cương vực Phiên Thiên và Bái Thiên tông.',[6961,7141,7441],null,3],
    ['tong','Bái Thiên tông','Như trên.',[6961,7141,7441],null,3],
    ['vung','Vạn Thánh sơn','Cương vực có phân đà Cửu U Ma Cung.',[6901,6961],null,3],
    ['tong','Tiên Thiên Đạo Môn','Đạo môn của Ma giới.',[7253,7621],null,3]
  ]
};
const st=STORIES.find(s=>s.id==='kinh-thien-kiem-de'),SZ=(window.SIZES&&SIZES['kinh-thien-kiem-de'])||{};
st.worlds.forEach(w=>{w.places=(PL[w.id]||[]).map(([t,n,d,ch,inn,s])=>({t,n,d,ch,in:inn||null,s:s||SZ[w.id+'|'+n]||2}))});
})();
