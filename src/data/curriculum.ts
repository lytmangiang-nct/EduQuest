export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number | number[] | string;
  explanation: string;
  type?: 'multiple-choice' | 'sorting' | 'fill-in-the-blank' | 'true-false';
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  category: 'CS' | 'ICT' | 'DB' | 'NET';
  grade: 10 | 11 | 12;
  questions: Question[];
  theory?: string;
}

export const TOPICS: Topic[] = [
  // LỚP 10
  {
    id: 'g10-society',
    title: 'Chủ đề 1: Máy tính và xã hội tri thức',
    description: 'Tìm hiểu về vai trò của máy tính, sự phát triển của xã hội tri thức và kinh tế tri thức.',
    category: 'ICT',
    grade: 10,
    theory: `### 1. Thông tin và dữ liệu
- **Dữ liệu**: Là các số liệu, văn bản, hình ảnh, âm thanh,... được lưu trữ trong máy tính.
- **Thông tin**: Là ý nghĩa của dữ liệu, giúp con người hiểu biết về thế giới.
- **Vật mang tin**: Là phương tiện dùng để lưu trữ và truyền tải thông tin.

### 2. Xã hội tri thức
- Là xã hội mà tri thức trở thành yếu tố quyết định đối với sự phát triển kinh tế, văn hóa, xã hội.
- Máy tính và Internet là công cụ cốt lõi để tạo ra, truyền tải và sử dụng tri thức.`,
    questions: [
      {
        id: 'g10-s-1',
        text: 'Dữ liệu sau khi được xử lý và mang lại ý nghĩa cho con người được gọi là gì?',
        options: ['Vật mang tin', 'Thông tin', 'Tín hiệu', 'Mã hóa'],
        correctAnswer: 1,
        explanation: 'Thông tin là ý nghĩa của dữ liệu sau khi được con người hoặc máy tính xử lý.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'g10-s-2',
        text: 'Xã hội tri thức là xã hội dựa trên việc sản xuất, phân phối và sử dụng kiến thức.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là định nghĩa cơ bản của xã hội tri thức.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-s-3',
        text: 'Thiết bị nào sau đây là vật mang tin?',
        options: ['Thẻ nhớ', 'Đĩa CD', 'Giấy', 'Tất cả các đáp án trên'],
        correctAnswer: 3,
        explanation: 'Mọi phương tiện lưu trữ thông tin đều được gọi là vật mang tin.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'g10-s-4',
        text: 'Điền từ còn thiếu: "Kinh tế ... là nền kinh tế dựa trên việc ứng dụng tri thức và công nghệ cao."',
        options: [],
        correctAnswer: 'tri thức',
        explanation: 'Kinh tế tri thức là khái niệm chỉ nền kinh tế dựa trên tri thức.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      },
      {
        id: 'g10-s-5',
        text: 'Đâu là đặc điểm của xã hội tri thức?',
        options: ['Tri thức là tài sản quan trọng nhất', 'Công nghệ thông tin phát triển mạnh', 'Học tập suốt đời là nhu cầu thiết yếu', 'Tất cả các đáp án trên'],
        correctAnswer: 3,
        explanation: 'Xã hội tri thức bao gồm tất cả các đặc điểm nêu trên.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'g10-s-6',
        text: 'Máy tính giúp con người xử lý thông tin nhanh hơn và chính xác hơn.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Khả năng tính toán và xử lý của máy tính vượt xa con người về tốc độ và độ chính xác.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-s-7',
        text: 'Cách mạng công nghiệp lần thứ tư (4.0) dựa trên nền tảng nào?',
        options: ['Động cơ hơi nước', 'Điện năng', 'Công nghệ số và trí tuệ nhân tạo', 'Sản xuất dây chuyền'],
        correctAnswer: 2,
        explanation: 'Cách mạng 4.0 tập trung vào sự kết nối giữa thế giới thực và thế giới số thông qua AI, IoT,...',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'g10-s-8',
        text: 'Điền từ: "Trong máy tính, mọi dữ liệu đều được chuyển đổi thành dãy các ..."',
        options: [],
        correctAnswer: 'bit',
        explanation: 'Máy tính sử dụng hệ nhị phân (0 và 1) để lưu trữ và xử lý dữ liệu.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'g10-network',
    title: 'Chủ đề 2: Mạng máy tính và Internet',
    description: 'Khám phá cách các máy tính kết nối với nhau và hoạt động của Internet toàn cầu.',
    category: 'NET',
    grade: 10,
    theory: `### 1. Mạng máy tính
- Là tập hợp các máy tính được kết nối với nhau để chia sẻ tài nguyên và trao đổi thông tin.
- Thành phần: Thiết bị đầu cuối, thiết bị kết nối, phần mềm mạng.

### 2. Internet
- Là mạng máy tính khổng lồ, kết nối hàng triệu mạng nhỏ trên toàn thế giới.
- Sử dụng bộ giao thức TCP/IP.

### 3. Điện toán đám mây (Cloud Computing)
- Cung cấp các dịch vụ CNTT qua Internet (lưu trữ, phần mềm, máy chủ).`,
    questions: [
      {
        id: 'g10-n-1',
        text: 'Mạng máy tính giúp người dùng chia sẻ tài nguyên như máy in, dữ liệu.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Chia sẻ tài nguyên là một trong những mục đích chính của mạng máy tính.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-n-2',
        text: 'Thiết bị nào dùng để kết nối các máy tính trong một mạng LAN?',
        options: ['Switch', 'Chuột', 'Bàn phím', 'Loa'],
        correctAnswer: 0,
        explanation: 'Switch (Bộ chuyển mạch) là thiết bị trung tâm kết nối các máy tính trong mạng cục bộ.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'g10-n-3',
        text: 'Internet thuộc loại mạng nào sau đây?',
        options: ['LAN', 'WAN', 'PAN', 'SAN'],
        correctAnswer: 1,
        explanation: 'WAN (Wide Area Network) là mạng diện rộng, Internet là mạng diện rộng lớn nhất.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'g10-n-4',
        text: 'Điền từ: "Giao thức ... là ngôn ngữ chung để các máy tính trên Internet có thể hiểu nhau."',
        options: [],
        correctAnswer: 'TCP/IP',
        explanation: 'TCP/IP là bộ giao thức nền tảng của Internet.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      },
      {
        id: 'g10-n-5',
        text: 'Dịch vụ lưu trữ Google Drive là một ví dụ về điện toán đám mây.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Google Drive cho phép lưu trữ và truy cập dữ liệu qua Internet, đây là dịch vụ Cloud.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-n-6',
        text: 'IoT (Internet of Things) có nghĩa là gì?',
        options: ['Mạng lưới vạn vật kết nối Internet', 'Mạng máy tính nội bộ', 'Hệ thống bảo mật mạng', 'Phần mềm duyệt web'],
        correctAnswer: 0,
        explanation: 'IoT là sự kết nối các thiết bị thông minh qua mạng Internet.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'g10-n-7',
        text: 'Địa chỉ IP dùng để làm gì?',
        options: ['Định danh các thiết bị trên mạng', 'Tăng tốc độ mạng', 'Lưu trữ dữ liệu', 'Quét virus'],
        correctAnswer: 0,
        explanation: 'Mỗi thiết bị khi tham gia mạng đều cần một địa chỉ IP duy nhất để liên lạc.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'g10-n-8',
        text: 'Điền từ: "Mạng ... là mạng kết nối các máy tính trong phạm vi nhỏ như một căn phòng hoặc tòa nhà."',
        options: [],
        correctAnswer: 'LAN',
        explanation: 'LAN (Local Area Network) là mạng cục bộ.',
        type: 'fill-in-the-blank',
        difficulty: 'easy'
      },
      {
        id: 'g10-n-9',
        text: 'Trình duyệt web là một thiết bị phần cứng.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Trình duyệt web (Chrome, Edge,...) là phần mềm ứng dụng.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-n-10',
        text: 'Lợi ích của điện toán đám mây là gì?',
        options: ['Tiết kiệm chi phí phần cứng', 'Truy cập dữ liệu mọi lúc mọi nơi', 'Dễ dàng mở rộng dung lượng', 'Tất cả các đáp án trên'],
        correctAnswer: 3,
        explanation: 'Cloud mang lại nhiều lợi ích về chi phí, tính linh hoạt và khả năng truy cập.',
        type: 'multiple-choice',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'g10-ethics',
    title: 'Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số',
    description: 'Học cách ứng xử văn minh, tuân thủ pháp luật và bảo vệ bản thân trên không gian mạng.',
    category: 'ICT',
    grade: 10,
    theory: `### 1. Văn hóa ứng xử trên mạng
- Tôn trọng người khác, không dùng từ ngữ thô tục.
- Không chia sẻ thông tin giả mạo (Fake news).

### 2. Bản quyền và Pháp luật
- Tôn trọng quyền tác giả, không sử dụng phần mềm lậu.
- Luật An ninh mạng quy định các hành vi bị cấm trên không gian mạng.

### 3. Bảo mật thông tin cá nhân
- Không chia sẻ mật khẩu, số CCCD, địa chỉ nhà cho người lạ.`,
    questions: [
      {
        id: 'g10-e-1',
        text: 'Việc chia sẻ thông tin chưa kiểm chứng lên mạng xã hội là hành vi đúng đắn.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Chia sẻ tin giả có thể gây hoang mang dư luận và vi phạm pháp luật.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-e-2',
        text: 'Khi sử dụng lại hình ảnh của người khác trên mạng, chúng ta nên làm gì?',
        options: ['Xóa tên tác giả', 'Sử dụng tự nhiên không cần hỏi', 'Ghi rõ nguồn và tên tác giả', 'Chỉnh sửa để biến thành của mình'],
        correctAnswer: 2,
        explanation: 'Đây là hành động tôn trọng bản quyền tác giả.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'g10-e-3',
        text: 'Hành vi nào sau đây vi phạm Luật An ninh mạng?',
        options: ['Học tập trực tuyến', 'Phát tán mã độc', 'Tìm kiếm thông tin khoa học', 'Gửi email cho bạn bè'],
        correctAnswer: 1,
        explanation: 'Phát tán mã độc là hành vi phá hoại và bị pháp luật nghiêm cấm.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'g10-e-4',
        text: 'Điền từ: "Quyền ... là quyền của tổ chức, cá nhân đối với tác phẩm do mình sáng tạo ra."',
        options: [],
        correctAnswer: 'tác giả',
        explanation: 'Quyền tác giả bảo vệ các sản phẩm trí tuệ.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      },
      {
        id: 'g10-e-5',
        text: 'Chúng ta nên đặt mật khẩu máy tính là ngày sinh để dễ nhớ.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Mật khẩu là ngày sinh rất dễ bị đoán ra (brute force), không an toàn.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-e-6',
        text: 'Phần mềm tự do (Free Software) có nghĩa là người dùng có quyền gì?',
        options: ['Chỉ được dùng miễn phí', 'Được xem mã nguồn và chỉnh sửa', 'Không được chia sẻ cho người khác', 'Chỉ được cài trên 1 máy'],
        correctAnswer: 1,
        explanation: 'Phần mềm tự do nhấn mạnh vào quyền tự do nghiên cứu, chỉnh sửa và phân phối.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'g10-e-7',
        text: 'Bắt nạt qua mạng (Cyberbullying) có thể gây hậu quả nghiêm trọng về tâm lý.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là vấn đề nhức nhối trong môi trường số hiện nay.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-e-8',
        text: 'Điền từ: "Dấu chân ... là những dấu vết dữ liệu bạn để lại khi sử dụng Internet."',
        options: [],
        correctAnswer: 'số',
        explanation: 'Dấu chân số (Digital footprint) bao gồm lịch sử duyệt web, bài đăng mạng xã hội,...',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'g10-office',
    title: 'Chủ đề 4: Ứng dụng tin học (Văn phòng)',
    description: 'Thành thạo các công cụ soạn thảo văn bản, bảng tính và trình chiếu chuyên nghiệp.',
    category: 'ICT',
    grade: 10,
    theory: `### 1. Soạn thảo văn bản (Word)
- Định dạng đoạn văn, trang in.
- Chèn bảng, hình ảnh, sơ đồ.

### 2. Bảng tính điện tử (Excel)
- Kiểu dữ liệu: Số, văn bản, ngày tháng.
- Công thức và hàm: SUM, AVERAGE, IF, MIN, MAX.

### 3. Trình chiếu (PowerPoint)
- Thiết kế slide, hiệu ứng chuyển động.`,
    questions: [
      {
        id: 'g10-o-1',
        text: 'Trong Word, tổ hợp phím Ctrl + S dùng để làm gì?',
        options: ['Sao chép', 'Dán', 'Lưu văn bản', 'Cắt'],
        correctAnswer: 2,
        explanation: 'Ctrl + S (Save) là phím tắt phổ biến để lưu tệp.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'g10-o-2',
        text: 'Trong Excel, mọi công thức đều phải bắt đầu bằng dấu gì?',
        options: ['Dấu +', 'Dấu -', 'Dấu =', 'Dấu *'],
        correctAnswer: 2,
        explanation: 'Dấu bằng (=) báo hiệu cho Excel biết đây là một công thức.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'g10-o-3',
        text: 'Hàm nào dùng để tính trung bình cộng của một dãy số trong Excel?',
        options: ['SUM', 'AVERAGE', 'COUNT', 'MAX'],
        correctAnswer: 1,
        explanation: 'AVERAGE là hàm tính giá trị trung bình.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'g10-o-4',
        text: 'Điền từ: "Trong Excel, địa chỉ ô $A$1 được gọi là địa chỉ ..."',
        options: [],
        correctAnswer: 'tuyệt đối',
        explanation: 'Địa chỉ có dấu $ cố định cả dòng và cột khi sao chép công thức.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      },
      {
        id: 'g10-o-5',
        text: 'Phần mềm PowerPoint dùng để tạo các bài trình chiếu sinh động.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là chức năng chính của PowerPoint.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'g10-o-6',
        text: 'Để ngắt trang trong Word, ta dùng tổ hợp phím nào?',
        options: ['Ctrl + Enter', 'Alt + Enter', 'Shift + Enter', 'Space + Enter'],
        correctAnswer: 0,
        explanation: 'Ctrl + Enter giúp đẩy nội dung sang trang mới ngay lập tức.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'g10-o-7',
        text: 'Trong Excel, kết quả của công thức =SUM(10, 20, 30) là bao nhiêu?',
        options: ['30', '50', '60', '0'],
        correctAnswer: 2,
        explanation: '10 + 20 + 30 = 60.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'g10-o-8',
        text: 'Điền từ: "Để định dạng in đậm cho chữ, ta dùng tổ hợp phím Ctrl + ..."',
        options: [],
        correctAnswer: 'B',
        explanation: 'Ctrl + B (Bold) dùng để in đậm.',
        type: 'fill-in-the-blank',
        difficulty: 'easy'
      },
      {
        id: 'g10-o-9',
        text: 'Hàm IF trong Excel dùng để kiểm tra một điều kiện.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Hàm IF trả về giá trị khác nhau dựa trên điều kiện đúng hoặc sai.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'g10-o-10',
        text: 'Để chèn thêm một cột vào giữa cột A và B trong Excel, ta chọn cột B rồi nhấn chuột phải chọn Insert.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Excel luôn chèn cột mới vào bên trái cột đang chọn.',
        type: 'true-false',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'g10-intro-1',
    title: 'Thông tin và xử lý thông tin',
    description: 'Tìm hiểu về dữ liệu, thông tin và các bước xử lý thông tin cơ bản.',
    category: 'ICT',
    grade: 10,
    questions: [
      {
        id: 'q10-1',
        text: 'Đơn vị nhỏ nhất để đo lượng thông tin là gì?',
        options: ['Byte', 'Bit', 'Kilobyte', 'Megabyte'],
        correctAnswer: 1,
        explanation: 'Bit (Binary Digit) là đơn vị nhỏ nhất dùng để đo lượng thông tin trong máy tính.',
        type: 'multiple-choice'
      },
      {
        id: 'q10-2',
        text: '1 Byte bằng bao nhiêu Bit?',
        options: ['4 Bit', '8 Bit', '16 Bit', '32 Bit'],
        correctAnswer: 1,
        explanation: 'Theo quy ước, 1 Byte = 8 Bit.',
        type: 'multiple-choice'
      }
    ]
  },
  {
    id: 'g10-hw-1',
    title: 'Chủ đề 5: Hệ thống máy tính',
    description: 'Cấu trúc phần cứng, CPU, bộ nhớ và các thiết bị ngoại vi theo kiến trúc Von Neumann.',
    category: 'ICT',
    grade: 10,
    theory: `### 1. Kiến trúc Von Neumann
- **Bộ xử lý trung tâm (CPU)**: Điều khiển và thực hiện các phép tính.
- **Bộ nhớ (Memory)**: Lưu trữ dữ liệu (RAM - tạm thời, ROM - cố định).
- **Thiết bị vào/ra (I/O Devices)**: Nhập và xuất dữ liệu.

### 2. Phần cứng và Phần mềm
- **Phần cứng (Hardware)**: Các thiết bị vật lý cấu thành máy tính.
- **Phần mềm (Software)**: Các chương trình điều khiển phần cứng (Hệ điều hành, Ứng dụng).`,
    questions: [
      {
        id: 'q10-hw-1',
        text: 'Thành phần nào được coi là "bộ não" của máy tính?',
        options: ['RAM', 'Ổ cứng', 'CPU', 'Card đồ họa'],
        correctAnswer: 2,
        explanation: 'CPU (Central Processing Unit) thực hiện các phép tính và điều khiển mọi hoạt động của máy tính.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q10-hw-2',
        text: 'Thiết bị nào sau đây là thiết bị vào (Input)?',
        options: ['Màn hình', 'Máy in', 'Bàn phím', 'Loa'],
        correctAnswer: 2,
        explanation: 'Bàn phím dùng để nhập dữ liệu vào máy tính.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q10-hw-3',
        text: 'RAM là viết tắt của cụm từ nào?',
        options: ['Read Access Memory', 'Random Access Memory', 'Real Access Memory', 'Run Access Memory'],
        correctAnswer: 1,
        explanation: 'RAM (Random Access Memory) là bộ nhớ truy cập ngẫu nhiên.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q10-hw-4',
        text: 'Dữ liệu trong RAM sẽ bị mất khi máy tính mất điện.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'RAM là bộ nhớ tạm thời, dữ liệu sẽ bị xóa khi không có nguồn điện.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q10-hw-5',
        text: 'Đơn vị đo tốc độ xử lý của CPU thường là gì?',
        options: ['GB', 'GHz', 'Mbps', 'DPI'],
        correctAnswer: 1,
        explanation: 'GHz (Gigahertz) là đơn vị đo xung nhịp của bộ vi xử lý.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q10-hw-6',
        text: 'Hệ điều hành Windows thuộc loại phần mềm nào?',
        options: ['Phần mềm ứng dụng', 'Phần mềm hệ thống', 'Phần mềm mã nguồn mở', 'Phần mềm diệt virus'],
        correctAnswer: 1,
        explanation: 'Hệ điều hành là phần mềm hệ thống quản lý phần cứng và các ứng dụng khác.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q10-hw-7',
        text: 'Thiết bị nào dùng để lưu trữ dữ liệu lâu dài ngay cả khi tắt máy?',
        options: ['RAM', 'CPU', 'Ổ cứng (HDD/SSD)', 'Bus'],
        correctAnswer: 2,
        explanation: 'Ổ cứng là bộ nhớ ngoài dùng để lưu trữ dữ liệu bền vững.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q10-hw-8',
        text: 'ROM là bộ nhớ chỉ cho phép đọc dữ liệu, không cho phép ghi đè thông thường.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'ROM (Read Only Memory) chứa các chương trình khởi động máy tính.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q10-hw-9',
        text: 'Thành phần ALU trong CPU có chức năng gì?',
        options: ['Điều khiển các thiết bị', 'Thực hiện các phép tính số học và logic', 'Lưu trữ dữ liệu tạm thời', 'Kết nối Internet'],
        correctAnswer: 1,
        explanation: 'ALU (Arithmetic Logic Unit) đảm nhận việc tính toán trong CPU.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q10-hw-10',
        text: 'Điền từ: "Kiến trúc ... là mô hình cơ bản của hầu hết các máy tính hiện nay."',
        options: [],
        correctAnswer: 'Von Neumann',
        explanation: 'Kiến trúc Von Neumann bao gồm CPU, bộ nhớ và hệ thống I/O.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'prog-10',
    title: 'Chủ đề 6: Lập trình Python cơ bản',
    description: 'Làm quen với biến, kiểu dữ liệu, các câu lệnh điều khiển và cấu trúc lặp trong Python.',
    category: 'CS',
    grade: 10,
    theory: `### 1. Biến và Kiểu dữ liệu
- **Biến**: Dùng để lưu trữ giá trị.
- **Kiểu dữ liệu**: int (số nguyên), float (số thực), str (chuỗi), bool (logic).

### 2. Các phép toán
- +, -, *, / (chia thực), // (chia nguyên), % (chia dư), ** (lũy thừa).

### 3. Cấu trúc điều khiển
- **Rẽ nhánh**: if, elif, else.
- **Vòng lặp**: for, while.`,
    questions: [
      {
        id: 'q10-py-1',
        text: 'Để in một dòng chữ ra màn hình trong Python, ta dùng hàm nào?',
        options: ['input()', 'print()', 'output()', 'display()'],
        correctAnswer: 1,
        explanation: 'Hàm print() dùng để xuất dữ liệu ra màn hình.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q10-py-2',
        text: 'Trong Python, kết quả của phép toán 10 // 3 là bao nhiêu?',
        options: ['3.33', '3', '1', '10'],
        correctAnswer: 1,
        explanation: 'Phép toán // dùng để chia lấy phần nguyên.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q10-py-3',
        text: 'Đâu là cách đặt tên biến ĐÚNG trong Python?',
        options: ['1_variable', 'my-variable', 'my_variable', 'my variable'],
        correctAnswer: 2,
        explanation: 'Tên biến không được bắt đầu bằng số, không chứa dấu gạch ngang hoặc khoảng trắng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q10-py-4',
        text: 'Để nhận dữ liệu nhập vào từ bàn phím, ta dùng hàm nào?',
        options: ['get()', 'read()', 'input()', 'scan()'],
        correctAnswer: 2,
        explanation: 'Hàm input() luôn trả về một chuỗi (string) từ người dùng.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q10-py-5',
        text: 'Kiểu dữ liệu của x = "100" là gì?',
        options: ['int', 'float', 'str', 'bool'],
        correctAnswer: 2,
        explanation: 'Dữ liệu nằm trong dấu ngoặc kép là kiểu chuỗi (string).',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q10-py-6',
        text: 'Câu lệnh nào dùng để kiểm tra nhiều điều kiện rẽ nhánh?',
        options: ['if', 'else', 'elif', 'switch'],
        correctAnswer: 2,
        explanation: 'elif (else if) dùng để kiểm tra các điều kiện bổ sung sau if.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q10-py-7',
        text: 'Trong Python, hàm nào dùng để thêm phần tử vào cuối danh sách?',
        options: ['add()', 'insert()', 'append()', 'extend()'],
        correctAnswer: 2,
        explanation: 'Hàm append() thêm một phần tử vào vị trí cuối cùng của list.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q10-py-8',
        text: 'Vòng lặp for i in range(5) sẽ chạy bao nhiêu lần?',
        options: ['4 lần', '5 lần', '6 lần', 'Vô hạn'],
        correctAnswer: 1,
        explanation: 'range(5) tạo ra dãy số từ 0 đến 4, tổng cộng 5 giá trị.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q10-py-9',
        text: 'Kết quả của biểu thức 2 ** 3 là bao nhiêu?',
        options: ['6', '8', '9', '5'],
        correctAnswer: 1,
        explanation: 'Dấu ** dùng để tính lũy thừa (2 mũ 3 = 8).',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q10-py-10',
        text: 'Điền từ: "Câu lệnh ... dùng để kết thúc vòng lặp ngay lập tức."',
        options: [],
        correctAnswer: 'break',
        explanation: 'Lệnh break dùng để thoát khỏi vòng lặp for hoặc while.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      }
    ]
  },

  // LỚP 11
  {
    id: 'db-11',
    title: 'Cơ sở dữ liệu (CSDL)',
    description: 'Khám phá khái niệm CSDL, hệ quản trị CSDL và mô hình dữ liệu quan hệ.',
    category: 'DB',
    grade: 11,
    questions: [
      {
        id: 'db-11-q1',
        text: 'Thành phần nào sau đây KHÔNG phải là thành phần của hệ CSDL?',
        options: ['Cơ sở dữ liệu', 'Hệ quản trị CSDL', 'Phần cứng', 'Trình duyệt web'],
        correctAnswer: 3,
        explanation: 'Hệ CSDL bao gồm: CSDL, Hệ quản trị CSDL và các phần mềm ứng dụng CSDL.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'db-11-q2',
        text: 'Cơ sở dữ liệu là gì?',
        options: [
          'Một tập hợp các tệp văn bản ngẫu nhiên',
          'Một tập hợp dữ liệu có cấu trúc được lưu trữ trên máy tính',
          'Một phần mềm để soạn thảo văn bản',
          'Một thiết bị phần cứng để lưu trữ'
        ],
        correctAnswer: 1,
        explanation: 'CSDL là một tập hợp các dữ liệu có liên quan với nhau, được sắp xếp có cấu trúc và lưu trữ trên các thiết bị nhớ.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'db-11-q3',
        text: 'Hệ quản trị CSDL (DBMS) có chức năng chính là gì?',
        options: [
          'Thiết kế phần cứng máy tính',
          'Quản lý và điều khiển việc truy cập vào CSDL',
          'Soạn thảo email',
          'Chỉnh sửa hình ảnh'
        ],
        correctAnswer: 1,
        explanation: 'DBMS là phần mềm cung cấp môi trường để người dùng có thể tạo lập, lưu trữ và khai thác dữ liệu của CSDL.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'db-11-q4',
        text: 'Trong mô hình dữ liệu quan hệ, dữ liệu được tổ chức dưới dạng nào?',
        options: ['Cây', 'Danh sách liên kết', 'Bảng (Table)', 'Đồ thị'],
        correctAnswer: 2,
        explanation: 'Mô hình quan hệ tổ chức dữ liệu dưới dạng các bảng gồm các hàng và các cột.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'db-11-q5',
        text: 'Khóa chính (Primary Key) của một bảng dùng để làm gì?',
        options: [
          'Để bảo mật dữ liệu',
          'Để xác định duy nhất mỗi bản ghi trong bảng',
          'Để sắp xếp dữ liệu theo bảng chữ cái',
          'Để kết nối Internet'
        ],
        correctAnswer: 1,
        explanation: 'Khóa chính là một hoặc một nhóm trường dùng để phân biệt các bản ghi khác nhau trong cùng một bảng.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'db-11-q6',
        text: 'Khóa ngoại (Foreign Key) dùng để làm gì?',
        options: [
          'Để xóa dữ liệu nhanh hơn',
          'Để liên kết dữ liệu giữa hai bảng',
          'Để thay thế khóa chính',
          'Để mã hóa dữ liệu'
        ],
        correctAnswer: 1,
        explanation: 'Khóa ngoại là một trường trong một bảng tham chiếu đến khóa chính của một bảng khác, tạo ra mối liên kết giữa chúng.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'db-11-q7',
        text: 'Sự dư thừa dữ liệu có thể dẫn đến vấn đề gì?',
        options: [
          'Tiết kiệm bộ nhớ',
          'Tăng tốc độ truy vấn',
          'Gây mất tính nhất quán của dữ liệu',
          'Dữ liệu an toàn hơn'
        ],
        correctAnswer: 2,
        explanation: 'Dư thừa dữ liệu lãng phí bộ nhớ và dễ dẫn đến sai sót khi cập nhật, làm mất tính nhất quán.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'db-11-q8',
        text: 'Trong một bảng CSDL, một hàng được gọi là gì?',
        options: ['Trường (Field)', 'Bản ghi (Record)', 'Thuộc tính (Attribute)', 'Kiểu dữ liệu'],
        correctAnswer: 1,
        explanation: 'Mỗi hàng trong bảng biểu diễn thông tin về một đối tượng cụ thể, được gọi là một bản ghi.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'db-11-q9',
        text: 'Chuẩn hóa dữ liệu (Normalization) nhằm mục đích gì?',
        options: [
          'Làm cho dữ liệu đẹp hơn',
          'Giảm thiểu dư thừa và tránh các lỗi logic khi cập nhật',
          'Tăng kích thước tệp CSDL',
          'Để người dùng dễ đọc hơn'
        ],
        correctAnswer: 1,
        explanation: 'Chuẩn hóa là quá trình tổ chức lại các bảng để giảm thiểu sự dư thừa và phụ thuộc không hợp lý.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'db-11-q10',
        text: 'Tính toàn vẹn thực thể (Entity Integrity) yêu cầu điều gì?',
        options: [
          'Khóa chính không được để trống (NULL)',
          'Khóa ngoại phải tồn tại',
          'Dữ liệu phải được mã hóa',
          'Bảng phải có ít nhất 10 hàng'
        ],
        correctAnswer: 0,
        explanation: 'Quy tắc này đảm bảo rằng mọi thực thể đều có thể được xác định duy nhất qua khóa chính.',
        type: 'multiple-choice',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'sql-11',
    title: 'Ngôn ngữ SQL',
    description: 'Học cách truy vấn dữ liệu bằng ngôn ngữ SQL cơ bản.',
    category: 'DB',
    grade: 11,
    questions: [
      {
        id: 'sql-11-q1',
        text: 'Câu lệnh nào dùng để lấy dữ liệu từ bảng?',
        options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
        correctAnswer: 2,
        explanation: 'SELECT là câu lệnh dùng để truy vấn và lấy dữ liệu từ các bảng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'sql-11-q2',
        text: 'SQL là viết tắt của cụm từ nào?',
        options: [
          'Simple Query Language',
          'Structured Query Language',
          'Standard Query Language',
          'Sequential Query Language'
        ],
        correctAnswer: 1,
        explanation: 'SQL (Structured Query Language) là ngôn ngữ truy vấn có cấu trúc.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'sql-11-q3',
        text: 'Để thêm một bản ghi mới vào bảng, ta dùng câu lệnh nào?',
        options: ['ADD', 'CREATE', 'INSERT INTO', 'UPDATE'],
        correctAnswer: 2,
        explanation: 'INSERT INTO được dùng để thêm các hàng dữ liệu mới vào bảng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'sql-11-q4',
        text: 'Câu lệnh UPDATE dùng để làm gì?',
        options: [
          'Xóa dữ liệu',
          'Sửa đổi dữ liệu hiện có trong bảng',
          'Tạo bảng mới',
          'Sắp xếp dữ liệu'
        ],
        correctAnswer: 1,
        explanation: 'UPDATE dùng để cập nhật giá trị của các trường trong các bản ghi đã tồn tại.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'sql-11-q5',
        text: 'Mệnh đề WHERE trong câu lệnh SELECT dùng để làm gì?',
        options: [
          'Sắp xếp kết quả',
          'Lọc các bản ghi theo điều kiện cụ thể',
          'Chọn các cột cần hiển thị',
          'Xóa các hàng trùng lặp'
        ],
        correctAnswer: 1,
        explanation: 'WHERE dùng để chỉ định các tiêu chuẩn mà bản ghi phải thỏa mãn để được chọn.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'sql-11-q6',
        text: 'Để sắp xếp kết quả truy vấn theo thứ tự tăng dần hoặc giảm dần, ta dùng mệnh đề nào?',
        options: ['GROUP BY', 'SORT BY', 'ORDER BY', 'ARRANGE BY'],
        correctAnswer: 2,
        explanation: 'ORDER BY dùng để sắp xếp tập kết quả theo một hoặc nhiều cột.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'sql-11-q7',
        text: 'Câu lệnh nào dùng để xóa toàn bộ bản ghi trong bảng mà không xóa cấu trúc bảng?',
        options: ['DROP', 'DELETE', 'REMOVE', 'CLEAR'],
        correctAnswer: 1,
        explanation: 'DELETE FROM [tên_bảng] xóa các hàng, trong khi DROP xóa toàn bộ bảng.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'sql-11-q8',
        text: 'Phép toán JOIN dùng để làm gì?',
        options: [
          'Kết hợp các hàng từ hai hoặc nhiều bảng dựa trên một cột liên quan',
          'Tính tổng các giá trị trong một cột',
          'Mã hóa dữ liệu trong bảng',
          'Tạo bản sao lưu cho CSDL'
        ],
        correctAnswer: 0,
        explanation: 'JOIN cho phép truy vấn dữ liệu từ nhiều bảng có mối quan hệ với nhau.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'sql-11-q9',
        text: 'Mệnh đề GROUP BY dùng để làm gì?',
        options: [
          'Sắp xếp dữ liệu',
          'Nhóm các hàng có cùng giá trị vào các hàng tóm tắt',
          'Lọc dữ liệu trước khi chọn',
          'Xóa các nhóm dữ liệu'
        ],
        correctAnswer: 1,
        explanation: 'GROUP BY thường được dùng với các hàm tổng hợp (COUNT, SUM, AVG,...) để nhóm kết quả.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'sql-11-q10',
        text: 'Mệnh đề HAVING khác gì so với WHERE?',
        options: [
          'Không có sự khác biệt',
          'WHERE dùng cho hàng, HAVING dùng cho các nhóm (sau GROUP BY)',
          'HAVING nhanh hơn WHERE',
          'WHERE chỉ dùng cho số, HAVING dùng cho chữ'
        ],
        correctAnswer: 1,
        explanation: 'WHERE lọc dữ liệu trước khi nhóm, còn HAVING lọc các nhóm đã được tạo ra bởi GROUP BY.',
        type: 'multiple-choice',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'net-11',
    title: 'Mạng máy tính và Internet',
    description: 'Tìm hiểu về giao thức, thiết bị mạng và an ninh mạng.',
    category: 'NET',
    grade: 11,
    questions: [
      {
        id: 'net-11-q1',
        text: 'Giao thức nào được sử dụng phổ biến nhất trên Internet hiện nay?',
        options: ['HTTP', 'TCP/IP', 'FTP', 'SMTP'],
        correctAnswer: 1,
        explanation: 'TCP/IP là bộ giao thức nền tảng cho mọi hoạt động trên Internet.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'net-11-q2',
        text: 'Mạng LAN (Local Area Network) là gì?',
        options: [
          'Mạng diện rộng kết nối các quốc gia',
          'Mạng cục bộ kết nối các thiết bị trong phạm vi nhỏ (nhà, trường học)',
          'Mạng không dây toàn cầu',
          'Mạng dành riêng cho quân đội'
        ],
        correctAnswer: 1,
        explanation: 'LAN là mạng kết nối các máy tính trong một khu vực địa lý hạn chế.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'net-11-q3',
        text: 'Địa chỉ IP dùng để làm gì?',
        options: [
          'Để tăng tốc độ máy tính',
          'Để định danh duy nhất một thiết bị trên mạng',
          'Để lưu trữ trang web',
          'Để bảo vệ máy tính khỏi virus'
        ],
        correctAnswer: 1,
        explanation: 'Mỗi thiết bị kết nối mạng cần một địa chỉ IP để các thiết bị khác có thể tìm thấy và liên lạc.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'net-11-q4',
        text: 'Thiết bị Router có chức năng chính là gì?',
        options: [
          'Hiển thị hình ảnh',
          'Kết nối các mạng khác nhau và định tuyến dữ liệu',
          'Gõ văn bản',
          'Lưu trữ tệp tin'
        ],
        correctAnswer: 1,
        explanation: 'Router chuyển tiếp các gói dữ liệu giữa các mạng máy tính.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'net-11-q5',
        text: 'DNS (Domain Name System) dùng để làm gì?',
        options: [
          'Để tải tệp nhanh hơn',
          'Chuyển đổi tên miền (như google.com) sang địa chỉ IP',
          'Để tạo mật khẩu an toàn',
          'Để kết nối bàn phím không dây'
        ],
        correctAnswer: 1,
        explanation: 'DNS giống như một danh bạ điện thoại của Internet, giúp con người truy cập web qua tên thay vì số IP khó nhớ.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'net-11-q6',
        text: 'Tường lửa (Firewall) dùng để làm gì?',
        options: [
          'Để làm mát máy tính',
          'Kiểm soát và ngăn chặn các truy cập trái phép vào mạng',
          'Để tăng độ sáng màn hình',
          'Để dọn dẹp ổ cứng'
        ],
        correctAnswer: 1,
        explanation: 'Firewall là một hệ thống an ninh mạng giám sát và kiểm soát lưu lượng mạng dựa trên các quy tắc bảo mật.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'net-11-q7',
        text: 'Giao thức HTTP dùng để làm gì?',
        options: [
          'Gửi email',
          'Truyền tải các trang siêu văn bản trên Web',
          'Truyền tệp tin lớn',
          'Điều khiển máy tính từ xa'
        ],
        correctAnswer: 1,
        explanation: 'HTTP (Hypertext Transfer Protocol) là nền tảng của việc trao đổi dữ liệu trên World Wide Web.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'net-11-q8',
        text: 'Mô hình OSI có bao nhiêu tầng?',
        options: ['4', '5', '7', '9'],
        correctAnswer: 2,
        explanation: 'Mô hình OSI (Open Systems Interconnection) gồm 7 tầng tiêu chuẩn cho truyền thông mạng.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'net-11-q9',
        text: 'Địa chỉ MAC là gì?',
        options: [
          'Địa chỉ IP tạm thời',
          'Địa chỉ vật lý duy nhất được gán cho mỗi card mạng',
          'Tên của người dùng máy tính',
          'Mật khẩu truy cập Wifi'
        ],
        correctAnswer: 1,
        explanation: 'MAC (Media Access Control) là địa chỉ phần cứng cố định của thiết bị mạng.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'net-11-q10',
        text: 'Sự khác biệt chính giữa TCP và UDP là gì?',
        options: [
          'TCP nhanh hơn UDP',
          'TCP đảm bảo truyền dữ liệu tin cậy, UDP thì không',
          'UDP chỉ dùng cho văn bản',
          'TCP không cần địa chỉ IP'
        ],
        correctAnswer: 1,
        explanation: 'TCP kiểm tra lỗi và đảm bảo thứ tự gói tin, trong khi UDP ưu tiên tốc độ và không kiểm tra lại.',
        type: 'multiple-choice',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'solve-11',
    title: 'Giải quyết bài toán trên máy tính',
    description: 'Quy trình các bước để giải quyết một bài toán cụ thể bằng máy tính.',
    category: 'CS',
    grade: 11,
    theory: `### Các bước giải bài toán trên máy tính
1. **Xác định bài toán**: Xác định Input, Output và các điều kiện.
2. **Lựa chọn hoặc thiết kế thuật toán**: Tìm cách giải tối ưu.
3. **Viết chương trình**: Chuyển thuật toán thành ngôn ngữ lập trình.
4. **Hiệu chỉnh**: Chạy thử và sửa lỗi.
5. **Viết tài liệu**: Hướng dẫn sử dụng và bảo trì.`,
    questions: [
      {
        id: 'q-s11-1',
        text: 'Bước đầu tiên trong quy trình giải bài toán trên máy tính là gì?',
        options: ['Viết chương trình', 'Xác định bài toán', 'Lựa chọn thuật toán', 'Hiệu chỉnh'],
        correctAnswer: 1,
        explanation: 'Xác định bài toán (Input, Output) là bước đầu tiên và quan trọng nhất.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-s11-2',
        text: 'Input của bài toán giải phương trình bậc nhất ax + b = 0 là gì?',
        options: ['x', 'a, b', 'a, b, x', '0'],
        correctAnswer: 1,
        explanation: 'Input là các hệ số a và b cần nhập vào.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-s11-3',
        text: 'Việc chạy thử chương trình với các bộ dữ liệu test thuộc bước nào?',
        options: ['Viết chương trình', 'Hiệu chỉnh', 'Xác định bài toán', 'Viết tài liệu'],
        correctAnswer: 1,
        explanation: 'Hiệu chỉnh là quá trình kiểm tra và sửa lỗi chương trình.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-s11-4',
        text: 'Thuật toán là một dãy hữu hạn các thao tác để tìm ra Output từ Input.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là định nghĩa cơ bản của thuật toán.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q-s11-5',
        text: 'Điền từ: "Quá trình chuyển đổi thuật toán sang ngôn ngữ lập trình gọi là ..."',
        options: [],
        correctAnswer: 'lập trình',
        explanation: 'Lập trình là việc hiện thực hóa thuật toán bằng mã code.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      },
      {
        id: 'q-s11-6',
        text: 'Một bài toán có thể có nhiều thuật toán khác nhau để giải quyết.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Tùy vào cách tiếp cận, ta có thể có nhiều thuật toán với độ phức tạp khác nhau.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q-s11-7',
        text: 'Độ phức tạp thuật toán thường được đánh giá qua yếu tố nào?',
        options: ['Màu sắc giao diện', 'Thời gian và không gian bộ nhớ', 'Số dòng code', 'Tên biến'],
        correctAnswer: 1,
        explanation: 'Thời gian thực hiện và dung lượng bộ nhớ là hai tiêu chí đánh giá thuật toán.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q-s11-8',
        text: 'Điền từ: "Sơ đồ ... là công cụ dùng để biểu diễn thuật toán bằng hình ảnh."',
        options: [],
        correctAnswer: 'khối',
        explanation: 'Sơ đồ khối giúp hình dung luồng xử lý của thuật toán.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'practice-11',
    title: 'Thực hành câu lệnh rẽ nhánh và vòng lặp',
    description: 'Áp dụng if-else và for-while để giải quyết các bài toán logic.',
    category: 'CS',
    grade: 11,
    theory: `### Cấu trúc rẽ nhánh (if)
- Dùng để thực hiện các thao tác khác nhau dựa trên điều kiện.
- Ví dụ: \`if x > 0: print("Dương")\`

### Cấu trúc lặp (for, while)
- **for**: Lặp với số lần biết trước.
- **while**: Lặp khi điều kiện còn đúng.`,
    questions: [
      {
        id: 'q-p11-1',
        text: 'Câu lệnh nào dùng để kiểm tra điều kiện trong Python?',
        options: ['for', 'while', 'if', 'print'],
        correctAnswer: 2,
        explanation: 'Lệnh if dùng để rẽ nhánh chương trình theo điều kiện.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-p11-2',
        text: 'Vòng lặp while sẽ dừng lại khi nào?',
        options: ['Khi điều kiện sai', 'Khi điều kiện đúng', 'Sau 10 lần lặp', 'Không bao giờ dừng'],
        correctAnswer: 0,
        explanation: 'Vòng lặp while tiếp tục chạy khi điều kiện còn True và dừng khi False.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-p11-3',
        text: 'Kết quả của đoạn code: \`for i in range(1, 4): print(i)\` là gì?',
        options: ['1 2 3 4', '1 2 3', '0 1 2 3', '4'],
        correctAnswer: 1,
        explanation: 'range(1, 4) tạo ra các số 1, 2, 3.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-p11-4',
        text: 'Lệnh break có tác dụng gì trong vòng lặp?',
        options: ['Bỏ qua lần lặp hiện tại', 'Kết thúc hoàn toàn vòng lặp', 'Quay lại đầu vòng lặp', 'Tăng tốc độ lặp'],
        correctAnswer: 1,
        explanation: 'break dùng để thoát khỏi vòng lặp ngay lập tức.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-p11-5',
        text: 'Trong Python, khối lệnh sau if phải được lùi đầu dòng (indentation).',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Python sử dụng khoảng trắng để xác định khối lệnh.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q-p11-6',
        text: 'Điền từ: "Lệnh ... dùng để bỏ qua các câu lệnh còn lại trong lần lặp hiện tại và bắt đầu lần lặp mới."',
        options: [],
        correctAnswer: 'continue',
        explanation: 'continue giúp chuyển sang lần lặp tiếp theo.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      },
      {
        id: 'q-p11-7',
        text: 'Vòng lặp lồng nhau là việc đặt một vòng lặp bên trong một vòng lặp khác.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là kỹ thuật phổ biến để xử lý dữ liệu nhiều chiều.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q-p11-8',
        text: 'Điền từ: "Biểu thức ... là biểu thức trả về giá trị True hoặc False."',
        options: [],
        correctAnswer: 'logic',
        explanation: 'Biểu thức logic (boolean) là nền tảng của các câu lệnh điều kiện.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'advanced-11',
    title: 'Lập trình nâng cao',
    description: 'Hàm, kiểu dữ liệu danh sách (list) và xử lý tệp tin.',
    category: 'CS',
    grade: 11,
    theory: `### 1. Hàm (Function)
- Giúp tái sử dụng mã nguồn. Định nghĩa bằng từ khóa \`def\`.

### 2. Danh sách (List)
- Lưu trữ nhiều phần tử trong một biến duy nhất.
- Ví dụ: \`a = [1, 2, 3]\`.

### 3. Xử lý tệp (File)
- Đọc và ghi dữ liệu vào tệp tin (.txt, .csv).`,
    questions: [
      {
        id: 'q-a11-1',
        text: 'Từ khóa nào dùng để định nghĩa một hàm trong Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        explanation: 'def (define) là từ khóa để bắt đầu định nghĩa hàm.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-a11-2',
        text: 'Để lấy độ dài của một danh sách, ta dùng hàm nào?',
        options: ['length()', 'size()', 'len()', 'count()'],
        correctAnswer: 2,
        explanation: 'Hàm len() trả về số lượng phần tử trong list.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-a11-3',
        text: 'Lệnh nào dùng để mở một tệp tin để đọc?',
        options: ['open("file.txt", "r")', 'open("file.txt", "w")', 'read("file.txt")', 'load("file.txt")'],
        correctAnswer: 0,
        explanation: 'Chế độ "r" (read) dùng để mở tệp để đọc.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-a11-4',
        text: 'Tham số của hàm là các giá trị được truyền vào khi gọi hàm.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Tham số giúp hàm xử lý linh hoạt với các dữ liệu khác nhau.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q-a11-5',
        text: 'Điền từ: "Hàm ... là hàm tự gọi lại chính nó."',
        options: [],
        correctAnswer: 'đệ quy',
        explanation: 'Đệ quy là một kỹ thuật lập trình nâng cao.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      },
      {
        id: 'q-a11-6',
        text: 'Phương thức append() thêm phần tử vào vị trí đầu tiên của danh sách.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'append() thêm vào cuối danh sách.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q-a11-7',
        text: 'Biến cục bộ là biến chỉ có giá trị bên trong hàm mà nó được định nghĩa.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Biến cục bộ giúp tránh xung đột tên biến trong chương trình lớn.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q-a11-8',
        text: 'Điền từ: "Để đóng một tệp tin sau khi xử lý, ta dùng phương thức ..."',
        options: [],
        correctAnswer: 'close',
        explanation: 'Việc đóng tệp giúp giải phóng tài nguyên hệ thống.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'graphics-11',
    title: 'Đồ họa và Ứng dụng',
    description: 'Tạo hình ảnh và giao diện đơn giản bằng mã lập trình.',
    category: 'ICT',
    grade: 11,
    theory: `### Thư viện Turtle
- Công cụ vẽ hình đơn giản thông qua việc điều khiển "con rùa".
- Các lệnh: \`forward()\`, \`left()\`, \`right()\`, \`circle()\`.

### Giao diện người dùng (GUI)
- Tạo các cửa sổ, nút bấm, ô nhập liệu.`,
    questions: [
      {
        id: 'q-g11-1',
        text: 'Thư viện nào trong Python thường dùng để dạy vẽ hình cơ bản?',
        options: ['math', 'random', 'turtle', 'os'],
        correctAnswer: 2,
        explanation: 'Turtle là thư viện đồ họa rùa rất phổ biến cho người mới học.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-g11-2',
        text: 'Lệnh turtle.forward(100) có tác dụng gì?',
        options: ['Quay trái 100 độ', 'Đi thẳng 100 đơn vị', 'Vẽ hình tròn bán kính 100', 'Xóa màn hình'],
        correctAnswer: 1,
        explanation: 'forward() di chuyển con rùa về phía trước.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-g11-3',
        text: 'Để vẽ một hình vuông, ta cần lặp lại lệnh đi thẳng và quay 90 độ bao nhiêu lần?',
        options: ['2 lần', '3 lần', '4 lần', '5 lần'],
        correctAnswer: 2,
        explanation: 'Hình vuông có 4 cạnh và 4 góc vuông.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-g11-4',
        text: 'Hệ tọa độ trong Turtle có tâm (0,0) nằm ở đâu?',
        options: ['Góc trên bên trái', 'Góc dưới bên phải', 'Chính giữa màn hình', 'Góc trên bên phải'],
        correctAnswer: 2,
        explanation: 'Mặc định tâm màn hình là gốc tọa độ (0,0).',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-g11-5',
        text: 'Lệnh turtle.pencolor("red") dùng để thay đổi màu nét vẽ.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'pencolor() thiết lập màu cho bút vẽ.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q-g11-6',
        text: 'Điền từ: "Để nhấc bút lên không để lại dấu vết khi di chuyển, ta dùng lệnh ..."',
        options: [],
        correctAnswer: 'penup',
        explanation: 'penup() (hoặc up()) nhấc bút vẽ lên.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      },
      {
        id: 'q-g11-7',
        text: 'Đồ họa vector không bị vỡ ảnh khi phóng to.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đồ họa vector dựa trên các công thức toán học nên giữ được độ nét.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q-g11-8',
        text: 'Điền từ: "RGB là mô hình màu kết hợp từ 3 màu: Đỏ, Xanh lá và ..."',
        options: [],
        correctAnswer: 'Xanh dương',
        explanation: 'Red, Green, Blue là 3 màu cơ bản trong hiển thị điện tử.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'it-app-11',
    title: 'Thực hành ứng dụng công nghệ thông tin',
    description: 'Sử dụng các công cụ số để làm việc và học tập hiệu quả.',
    category: 'ICT',
    grade: 11,
    theory: `### Công cụ cộng tác
- Google Docs, Sheets, Slides: Làm việc nhóm thời gian thực.
- Microsoft Teams, Zoom: Họp trực tuyến.

### Tìm kiếm thông tin
- Sử dụng từ khóa nâng cao, kiểm tra nguồn tin tin cậy.`,
    questions: [
      {
        id: 'q-i11-1',
        text: 'Ứng dụng nào sau đây hỗ trợ soạn thảo văn bản trực tuyến nhiều người cùng lúc?',
        options: ['Notepad', 'Google Docs', 'Paint', 'Calculator'],
        correctAnswer: 1,
        explanation: 'Google Docs cho phép nhiều người cùng chỉnh sửa một tài liệu qua Internet.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-i11-2',
        text: 'Để tìm kiếm chính xác một cụm từ trên Google, ta nên đặt cụm từ đó trong dấu gì?',
        options: ['Dấu ngoặc đơn ()', 'Dấu ngoặc kép ""', 'Dấu ngoặc vuông []', 'Dấu gạch chéo //'],
        correctAnswer: 1,
        explanation: 'Dấu ngoặc kép giúp tìm kiếm chính xác cụm từ đó.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-i11-3',
        text: 'Định dạng tệp tin nào thường dùng cho tài liệu văn bản?',
        options: ['.jpg', '.mp3', '.docx', '.exe'],
        correctAnswer: 2,
        explanation: '.docx là định dạng của Microsoft Word.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-i11-4',
        text: 'Lợi ích của việc lưu trữ dữ liệu trên "đám mây" là gì?',
        options: ['Truy cập từ bất kỳ thiết bị nào có Internet', 'Dễ dàng chia sẻ', 'Tránh mất dữ liệu khi hỏng phần cứng', 'Tất cả các đáp án trên'],
        correctAnswer: 3,
        explanation: 'Lưu trữ đám mây mang lại sự tiện lợi và an toàn cao.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-i11-5',
        text: 'Email là phương thức trao đổi thông tin tức thời (real-time) giống như Chat.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Email là trao đổi không tức thời, người nhận có thể đọc sau.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q-i11-6',
        text: 'Điền từ: "Phần mềm ... là phần mềm được cung cấp miễn phí mã nguồn để người dùng chỉnh sửa."',
        options: [],
        correctAnswer: 'mã nguồn mở',
        explanation: 'Ví dụ như Linux, LibreOffice.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      },
      {
        id: 'q-i11-7',
        text: 'Việc sao chép nội dung từ Internet mà không ghi nguồn là hành vi vi phạm đạo đức.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là hành vi đạo văn, cần tôn trọng quyền tác giả.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q-i11-8',
        text: 'Điền từ: "Tên miền .edu thường dành cho các tổ chức ..."',
        options: [],
        correctAnswer: 'giáo dục',
        explanation: 'Education (giáo dục).',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'security-11',
    title: 'An toàn thông tin',
    description: 'Bảo vệ dữ liệu và quyền riêng tư trong môi trường mạng.',
    category: 'ICT',
    grade: 11,
    theory: `### 1. Mã độc (Malware)
- Virus, Worm, Trojan, Ransomware: Các chương trình gây hại.

### 2. Biện pháp bảo vệ
- Sử dụng tường lửa (Firewall), phần mềm diệt virus.
- Xác thực 2 lớp (2FA).

### 3. Mã hóa dữ liệu
- Chuyển thông tin sang dạng không thể đọc được nếu không có khóa.`,
    questions: [
      {
        id: 'q-se11-1',
        text: 'Loại mã độc nào tự nhân bản và lây lan qua mạng mà không cần tệp vật chủ?',
        options: ['Virus', 'Worm (Sâu máy tính)', 'Trojan', 'Spyware'],
        correctAnswer: 1,
        explanation: 'Worm có khả năng tự lây lan độc lập qua các lỗ hổng mạng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q-se11-2',
        text: 'Xác thực 2 lớp (2FA) giúp tăng cường bảo mật cho tài khoản.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Ngoài mật khẩu, 2FA yêu cầu thêm một mã xác nhận khác.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q-se11-3',
        text: 'HTTPS an toàn hơn HTTP vì dữ liệu được truyền đi dưới dạng mã hóa.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Chữ "S" trong HTTPS là viết tắt của Secure.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q-se11-4',
        text: 'Phishing là hình thức tấn công gì?',
        options: ['Tấn công từ chối dịch vụ', 'Lừa đảo lấy thông tin qua email/web giả', 'Bẻ khóa mật khẩu bằng máy tính mạnh', 'Gắn mã độc vào phần cứng'],
        correctAnswer: 1,
        explanation: 'Phishing giả mạo các tổ chức uy tín để lừa người dùng cung cấp thông tin.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-se11-5',
        text: 'Tường lửa (Firewall) có chức năng chính là gì?',
        options: ['Diệt virus đã nhiễm vào máy', 'Kiểm soát lưu lượng mạng ra vào', 'Tăng tốc độ Internet', 'Lưu trữ mật khẩu'],
        correctAnswer: 1,
        explanation: 'Firewall ngăn chặn các truy cập trái phép từ mạng bên ngoài.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q-se11-6',
        text: 'Điền từ: "Mã hóa ... là quá trình chuyển văn bản rõ sang văn bản mã."',
        options: [],
        correctAnswer: 'dữ liệu',
        explanation: 'Mã hóa giúp bảo vệ tính riêng tư của thông tin.',
        type: 'fill-in-the-blank',
        difficulty: 'medium'
      },
      {
        id: 'q-se11-7',
        text: 'Ransomware là loại mã độc dùng để tống tiền người dùng bằng cách mã hóa dữ liệu của họ.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Người dùng phải trả tiền để lấy lại khóa giải mã.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q-se11-8',
        text: 'Điền từ: "Chữ ký ... dùng để xác thực nguồn gốc và tính toàn vẹn của văn bản điện tử."',
        options: [],
        correctAnswer: 'số',
        explanation: 'Chữ ký số có giá trị pháp lý tương đương chữ ký tay.',
        type: 'fill-in-the-blank',
        difficulty: 'hard'
      }
    ]
  },

  // LỚP 12
  {
    id: 'ai-12',
    title: 'Trí tuệ nhân tạo (AI)',
    description: 'Khái niệm cơ bản về AI, học máy và ứng dụng của AI trong đời sống.',
    category: 'CS',
    grade: 12,
    theory: `### 1. Khái niệm Trí tuệ nhân tạo (AI)
- AI là khả năng của máy tính có thể thực hiện các công việc đòi hỏi trí tuệ con người như suy luận, học tập, giải quyết vấn đề.
- **Học máy (Machine Learning)**: Một lĩnh vực của AI cho phép máy tính tự học từ dữ liệu mà không cần lập trình cụ thể.

### 2. Các lĩnh vực chính của AI
- **Xử lý ngôn ngữ tự nhiên (NLP)**: Giúp máy tính hiểu và giao tiếp bằng ngôn ngữ con người (ví dụ: ChatGPT, Google Translate).
- **Thị giác máy tính (Computer Vision)**: Giúp máy tính nhận diện hình ảnh, khuôn mặt (ví dụ: FaceID).
- **Hệ chuyên gia**: Mô phỏng khả năng ra quyết định của chuyên gia trong một lĩnh vực cụ thể.

### 3. Ứng dụng và Đạo đức AI
- Ứng dụng: Y tế (chẩn đoán bệnh), Giao thông (xe tự lái), Tài chính (phát hiện gian lận).
- Đạo đức: Cần đảm bảo tính minh bạch, công bằng và bảo mật dữ liệu.`,
    questions: [
      {
        id: 'q12-ai-1',
        text: 'Lĩnh vực nào của AI tập trung vào việc giúp máy tính hiểu và xử lý ngôn ngữ con người?',
        options: ['Computer Vision', 'NLP (Xử lý ngôn ngữ tự nhiên)', 'Robotics', 'Expert Systems'],
        correctAnswer: 1,
        explanation: 'NLP (Natural Language Processing) giúp máy tính tương tác với con người bằng ngôn ngữ tự nhiên.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ai-2',
        text: 'Học máy (Machine Learning) là một tập con của Trí tuệ nhân tạo.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Học máy là phương pháp chủ đạo để hiện thực hóa AI hiện nay.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-ai-3',
        text: 'Đâu là một ứng dụng của Thị giác máy tính (Computer Vision)?',
        options: ['Dịch văn bản tự động', 'Nhận diện khuôn mặt để mở khóa điện thoại', 'Chatbot trả lời khách hàng', 'Dự báo thời tiết'],
        correctAnswer: 1,
        explanation: 'Computer Vision giúp máy tính "nhìn" và hiểu nội dung hình ảnh/video.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ai-4',
        text: 'Hệ chuyên gia (Expert System) mô phỏng khả năng gì của con người?',
        options: ['Khả năng vận động', 'Khả năng cảm thụ âm nhạc', 'Khả năng ra quyết định của chuyên gia', 'Khả năng tiêu hóa'],
        correctAnswer: 2,
        explanation: 'Hệ chuyên gia sử dụng tri thức và suy luận để giải quyết vấn đề như một chuyên gia.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ai-5',
        text: 'AI có thể tự học từ dữ liệu mà không cần lập trình chi tiết cho từng bước gọi là gì?',
        options: ['Lập trình hướng đối tượng', 'Học máy (Machine Learning)', 'Cấu trúc dữ liệu', 'Hệ điều hành'],
        correctAnswer: 1,
        explanation: 'Đây là đặc điểm cốt lõi của Machine Learning.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ai-6',
        text: 'Trong y tế, AI giúp bác sĩ thực hiện công việc nào hiệu quả nhất?',
        options: ['Ghi chép bệnh án', 'Chẩn đoán bệnh qua hình ảnh X-quang, MRI', 'Dọn dẹp phòng bệnh', 'Nấu ăn cho bệnh nhân'],
        correctAnswer: 1,
        explanation: 'AI có khả năng nhận diện các dấu hiệu bệnh lý trên hình ảnh y tế rất chính xác.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ai-7',
        text: 'Xe tự lái sử dụng công nghệ nào để nhận biết chướng ngại vật?',
        options: ['Chỉ dùng bản đồ giấy', 'Cảm biến và Thị giác máy tính', 'Sóng vô tuyến AM', 'Sách hướng dẫn lái xe'],
        correctAnswer: 1,
        explanation: 'Xe tự lái kết hợp nhiều cảm biến và AI để xử lý hình ảnh thực tế.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ai-8',
        text: 'Vấn đề đạo đức quan trọng nhất khi phát triển AI là gì?',
        options: ['Làm sao để AI chạy nhanh nhất', 'Làm sao để AI có màu sắc đẹp', 'Tính minh bạch, công bằng và bảo mật dữ liệu', 'Làm sao để AI biết nói nhiều ngôn ngữ'],
        correctAnswer: 2,
        explanation: 'Đạo đức AI tập trung vào việc đảm bảo AI không gây hại và không thiên kiến.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ai-9',
        text: 'AI có khả năng thay thế hoàn toàn con người trong mọi lĩnh vực sáng tạo nghệ thuật.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'AI hỗ trợ sáng tạo nhưng cảm xúc và ý tưởng gốc vẫn cần đến con người.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-ai-10',
        text: 'Turing Test dùng để làm gì?',
        options: ['Kiểm tra tốc độ ổ cứng', 'Kiểm tra khả năng suy nghĩ giống con người của máy tính', 'Kiểm tra độ bền màn hình', 'Kiểm tra kết nối mạng'],
        correctAnswer: 1,
        explanation: 'Phép thử Turing là tiêu chuẩn kinh điển để đánh giá trí tuệ nhân tạo.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-ai-11',
        text: 'Deep Learning (Học sâu) là một kỹ thuật dựa trên cấu trúc nào của con người?',
        options: ['Hệ tiêu hóa', 'Mạng lưới thần kinh (Neural Networks)', 'Hệ xương', 'Hệ tuần hoàn'],
        correctAnswer: 1,
        explanation: 'Deep Learning mô phỏng cách các neuron thần kinh trong não bộ làm việc.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-ai-12',
        text: 'Tại sao dữ liệu lớn (Big Data) lại quan trọng đối với AI?',
        options: ['Để tốn thêm tiền lưu trữ', 'Để máy tính chạy chậm lại', 'Cung cấp nguyên liệu để AI học tập và cải thiện độ chính xác', 'Để trang trí cho máy chủ'],
        correctAnswer: 2,
        explanation: 'AI cần lượng dữ liệu khổng lồ để nhận diện các mẫu (patterns) phức tạp.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-ai-13',
        text: 'AI có thể gây ra sự bất bình đẳng nếu dữ liệu huấn luyện bị thiên kiến (bias).',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Nếu dữ liệu đầu vào không khách quan, kết quả của AI sẽ mang tính định kiến.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-ai-14',
        text: 'Ứng dụng nào sau đây KHÔNG phải là ứng dụng của AI?',
        options: ['Gợi ý phim trên Netflix', 'Máy tính bỏ túi thực hiện phép cộng', 'Trợ lý ảo Siri', 'Hệ thống phát hiện thư rác'],
        correctAnswer: 1,
        explanation: 'Phép cộng đơn giản là lập trình logic thuần túy, không cần trí tuệ nhân tạo.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ai-15',
        text: 'Trong tương lai, AI sẽ giúp con người giải quyết các vấn đề toàn cầu như biến đổi khí hậu.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'AI có khả năng phân tích dữ liệu môi trường phức tạp để đưa ra giải pháp.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-ai-16',
        text: 'Thuật ngữ "Singularity" trong AI ám chỉ điều gì?',
        options: ['Máy tính bị hỏng', 'Thời điểm trí tuệ máy tính vượt xa trí tuệ con người', 'Một loại ngôn ngữ lập trình mới', 'Tên một công ty công nghệ'],
        correctAnswer: 1,
        explanation: 'Singularity là giả thuyết về sự bùng nổ trí tuệ của máy móc.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-ai-17',
        text: 'AI có thể giúp cá nhân hóa lộ trình học tập cho từng học sinh.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'AI phân tích điểm mạnh/yếu của học sinh để đưa ra bài học phù hợp.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-ai-18',
        text: 'Robot hút bụi thông minh có sử dụng AI không?',
        options: ['Có', 'Không'],
        correctAnswer: 0,
        explanation: 'Nó sử dụng cảm biến và thuật toán AI để lập bản đồ và tránh vật cản.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-ai-19',
        text: 'AlphaGo là chương trình AI nổi tiếng trong lĩnh vực nào?',
        options: ['Chơi cờ vua', 'Chơi cờ vây', 'Lái xe', 'Sáng tác nhạc'],
        correctAnswer: 1,
        explanation: 'AlphaGo đã đánh bại nhà vô địch thế giới cờ vây, đánh dấu bước ngoặt của AI.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ai-20',
        text: 'Việc lạm dụng AI trong tạo video giả mạo (Deepfake) vi phạm đạo đức gì?',
        options: ['Quyền sở hữu trí tuệ', 'Quyền riêng tư và tính trung thực của thông tin', 'Quyền được học tập', 'Quyền được vui chơi'],
        correctAnswer: 1,
        explanation: 'Deepfake có thể dùng để bôi nhọ hoặc lừa đảo, gây hại nghiêm trọng.',
        type: 'multiple-choice',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'g12-communication',
    title: 'Giao tiếp và ứng xử trong không gian mạng',
    description: 'Học cách giao tiếp văn minh, lịch sự và an toàn trên môi trường Internet.',
    category: 'ICT',
    grade: 12,
    theory: `### 1. Quy tắc ứng xử trên mạng (Netiquette)
- **Tôn trọng**: Luôn coi trọng người khác như khi giao tiếp trực tiếp. Không dùng từ ngữ thô tục, xúc phạm.
- **Trách nhiệm**: Chịu trách nhiệm về lời nói và hành động của mình. Không lan truyền tin giả (Fake news).
- **An toàn**: Bảo vệ thông tin cá nhân và không xâm phạm quyền riêng tư của người khác.

### 2. Văn hóa giao tiếp qua email và tin nhắn
- Sử dụng tiêu đề rõ ràng, lời chào và lời kết lịch sự.
- Tránh viết hoa toàn bộ (tương đương với việc quát tháo).
- Kiểm tra lỗi chính tả và ngữ pháp trước khi gửi.

### 3. Phòng tránh bắt nạt qua mạng (Cyberbullying)
- Không tham gia vào các cuộc tranh cãi vô bổ hoặc công kích cá nhân.
- Báo cáo (Report) các hành vi xấu cho quản trị viên trang web hoặc cơ quan chức năng.

**Ví dụ thực tế:**
Khi tham gia một diễn đàn học tập, thay vì bình luận "Bài này dễ thế mà không biết làm à?", bạn nên viết "Chào bạn, bài này có thể giải bằng cách áp dụng công thức X, bạn thử xem nhé!".

**Ghi chú:** Ứng xử văn minh trên mạng không chỉ bảo vệ hình ảnh cá nhân mà còn góp phần xây dựng một cộng đồng số lành mạnh.`,
    questions: [
      {
        id: 'q12-com-1',
        text: '"Netiquette" là thuật ngữ dùng để chỉ điều gì?',
        options: ['Quy tắc ứng xử trên mạng', 'Tên một loại virus mới', 'Phần mềm diệt virus', 'Tốc độ đường truyền mạng'],
        correctAnswer: 0,
        explanation: 'Netiquette (Network Etiquette) là các quy tắc xã giao khi giao tiếp trên mạng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-com-2',
        text: 'Khi nhận được một tin nhắn xúc phạm từ người lạ trên mạng, hành động nào sau đây là phù hợp nhất?',
        options: ['Nhắn tin chửi lại để trả đũa', 'Im lặng và chặn người đó ngay lập tức', 'Chia sẻ lên trang cá nhân để mọi người cùng chỉ trích', 'Tìm cách xác định địa chỉ nhà người đó'],
        correctAnswer: 1,
        explanation: 'Chặn và phớt lờ là cách hiệu quả nhất để tránh bị lôi vào các cuộc xung đột tiêu cực.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-com-3',
        text: 'Viết hoa toàn bộ nội dung tin nhắn được coi là hành vi lịch sự trong giao tiếp số.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Viết hoa toàn bộ thường được hiểu là đang quát tháo hoặc nhấn mạnh quá mức gây khó chịu.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-com-4',
        text: 'Tại sao không nên chia sẻ mật khẩu cho bạn thân trên mạng?',
        options: ['Vì bạn sẽ quên mật khẩu', 'Để bảo vệ quyền riêng tư và tránh rủi ro tài khoản bị xâm nhập', 'Vì chia sẻ mật khẩu tốn dung lượng mạng', 'Vì mật khẩu là bí mật quốc gia'],
        correctAnswer: 1,
        explanation: 'Ngay cả bạn thân cũng có thể vô tình làm lộ mật khẩu của bạn.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-com-5',
        text: 'Hành động nào sau đây thể hiện sự tôn trọng bản quyền trên mạng?',
        options: ['Tải phim lậu về xem', 'Sử dụng hình ảnh của người khác và ghi rõ nguồn', 'Sao chép bài văn mẫu và nộp cho cô giáo', 'Bẻ khóa phần mềm để dùng miễn phí'],
        correctAnswer: 1,
        explanation: 'Ghi rõ nguồn là cách tối thiểu để tôn trọng công sức của tác giả.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-com-6',
        text: 'Tin giả (Fake news) thường có đặc điểm gì?',
        options: ['Luôn có nguồn gốc từ báo chính thống', 'Tiêu đề giật gân, gây sốc, thiếu bằng chứng xác thực', 'Nội dung rất nhàm chán', 'Chỉ xuất hiện trên tivi'],
        correctAnswer: 1,
        explanation: 'Fake news đánh vào tâm lý tò mò hoặc sợ hãi của người dùng.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-com-7',
        text: 'Khi thấy một bài đăng có nội dung bắt nạt bạn học, bạn nên làm gì?',
        options: ['Vào bình luận cổ vũ', 'Chia sẻ để nhiều người biết hơn', 'Báo cáo bài viết và khuyên ngăn bạn bè', 'Ngồi xem và không làm gì cả'],
        correctAnswer: 2,
        explanation: 'Cần có thái độ kiên quyết bài trừ các hành vi bắt nạt qua mạng.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-com-8',
        text: 'Dấu chân số (Digital Footprint) là gì?',
        options: ['Vết bẩn trên màn hình máy tính', 'Lịch sử các hoạt động của bạn trên Internet', 'Một loại virus máy tính', 'Tên một hãng giày'],
        correctAnswer: 1,
        explanation: 'Mọi hành động trên mạng đều để lại dấu vết khó xóa bỏ.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-com-9',
        text: 'Việc tự ý đăng ảnh dìm hàng bạn bè mà không được sự đồng ý là hành vi thiếu văn hóa.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Cần tôn trọng hình ảnh cá nhân của người khác.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-com-10',
        text: 'Tại sao cần kiểm tra lỗi chính tả trước khi gửi email chuyên nghiệp?',
        options: ['Để email trông dài hơn', 'Để thể hiện sự tôn trọng và tính chuyên nghiệp', 'Để máy tính không bị lỗi', 'Để người nhận không đọc được'],
        correctAnswer: 1,
        explanation: 'Email cẩu thả gây ấn tượng xấu về người gửi.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-com-11',
        text: 'Hành vi "Ghosting" (cắt đứt liên lạc đột ngột) trong giao tiếp mạng được coi là lịch sự.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Đây là hành vi thiếu tôn trọng đối phương.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-com-12',
        text: 'Quy tắc "Think before you post" có nghĩa là gì?',
        options: ['Suy nghĩ kỹ về hậu quả trước khi đăng tải bất cứ điều gì', 'Chỉ đăng bài khi thấy vui', 'Phải dùng máy tính xịn mới được đăng bài', 'Đăng bài xong rồi mới suy nghĩ'],
        correctAnswer: 0,
        explanation: 'Một bài đăng sai lầm có thể gây hậu quả lâu dài.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-com-13',
        text: 'Việc sử dụng biệt danh (nickname) cho phép bạn nói bất cứ điều gì mà không cần chịu trách nhiệm.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Mọi hành vi vi phạm pháp luật đều có thể bị truy vết qua địa chỉ IP.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-com-14',
        text: 'Khi tham gia họp trực tuyến, hành động nào sau đây là văn minh?',
        options: ['Tắt camera và đi ngủ', 'Bật micro để tiếng ồn lọt vào', 'Tắt micro khi không phát biểu và tập trung lắng nghe', 'Vừa họp vừa chơi game'],
        correctAnswer: 2,
        explanation: 'Tôn trọng người nói và không gây nhiễu là quy tắc cơ bản.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-com-15',
        text: 'Lừa đảo qua mạng (Scam) thường đánh vào tâm lý nào của nạn nhân?',
        options: ['Lòng tham hoặc sự sợ hãi', 'Sự thông minh', 'Sự lười biếng', 'Sự giàu có'],
        correctAnswer: 0,
        explanation: 'Kẻ lừa đảo thường hứa hẹn phần thưởng lớn hoặc đe dọa khóa tài khoản.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-com-16',
        text: 'Việc chia sẻ vị trí thời gian thực (Live location) cho người lạ trên mạng là rất nguy hiểm.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Có thể dẫn đến rủi ro bị theo dõi hoặc tấn công ngoài đời thực.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-com-17',
        text: 'Hành vi "Spam" tin nhắn gây phiền hà cho người khác có thể bị khóa tài khoản.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Hầu hết các nền tảng đều có chính sách chống spam nghiêm ngặt.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-com-18',
        text: 'Tại sao cần sử dụng tính năng "BCC" khi gửi email cho một nhóm người không quen biết nhau?',
        options: ['Để email gửi nhanh hơn', 'Để bảo vệ quyền riêng tư về địa chỉ email của mọi người', 'Để tiết kiệm dung lượng', 'Để email trông đẹp hơn'],
        correctAnswer: 1,
        explanation: 'BCC giúp ẩn danh sách người nhận, tránh lộ thông tin liên lạc.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-com-19',
        text: 'Văn hóa "Cancel Culture" (tẩy chay) trên mạng luôn mang lại kết quả tích cực.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Nó có thể dẫn đến sự công kích mù quáng và thiếu công bằng.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-com-20',
        text: 'Giao tiếp văn minh trên mạng giúp xây dựng thương hiệu cá nhân tốt đẹp.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Nhà tuyển dụng thường kiểm tra mạng xã hội của ứng viên.',
        type: 'true-false',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'g12-problem-solving',
    title: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
    description: 'Quy trình và tư duy giải quyết các bài toán thực tế bằng công cụ tin học.',
    category: 'CS',
    grade: 12,
    theory: `### 1. Quy trình giải quyết bài toán trên máy tính
- **Xác định bài toán**: Xác định rõ Input (đầu vào) và Output (đầu ra).
- **Lựa chọn thuật toán**: Tìm phương pháp giải tối ưu (nhanh nhất, ít tốn bộ nhớ nhất).
- **Viết chương trình**: Sử dụng ngôn ngữ lập trình (như Python) để hiện thực hóa thuật toán.
- **Kiểm thử và hiệu chỉnh**: Chạy thử với các bộ dữ liệu khác nhau để tìm và sửa lỗi.

### 2. Tư duy máy tính (Computational Thinking)
- **Chia nhỏ vấn đề (Decomposition)**: Chia một vấn đề lớn thành các phần nhỏ dễ quản lý.
- **Nhận diện mẫu (Pattern Recognition)**: Tìm kiếm sự tương đồng giữa các vấn đề.
- **Trừu tượng hóa (Abstraction)**: Tập trung vào các thông tin quan trọng, bỏ qua chi tiết thừa.
- **Thiết kế thuật toán (Algorithm Design)**: Xây dựng các bước giải quyết vấn đề.

### 3. Các công cụ hỗ trợ
- Phần mềm lập trình (IDE), bảng tính điện tử (Excel), các phần mềm mô phỏng.

**Ví dụ thực tế:**
Để quản lý điểm số của một lớp học, thay vì tính tay, ta có thể dùng Excel với các hàm SUM, AVERAGE hoặc viết một chương trình Python để tự động xếp loại học lực.

**Ghi chú:** Máy tính là công cụ mạnh mẽ, nhưng tư duy logic của con người mới là yếu tố quyết định cách giải quyết vấn đề hiệu quả.`,
    questions: [
      {
        id: 'q12-ps-1',
        text: 'Bước đầu tiên trong quy trình giải quyết bài toán trên máy tính là gì?',
        options: ['Viết chương trình', 'Lựa chọn thuật toán', 'Xác định bài toán', 'Kiểm thử'],
        correctAnswer: 2,
        explanation: 'Phải hiểu rõ bài toán (Input/Output) trước khi bắt tay vào giải quyết.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ps-2',
        text: 'Thành phần nào sau đây KHÔNG thuộc tư duy máy tính?',
        options: ['Chia nhỏ vấn đề', 'Trừu tượng hóa', 'Học thuộc lòng mã nguồn', 'Thiết kế thuật toán'],
        correctAnswer: 2,
        explanation: 'Tư duy máy tính tập trung vào kỹ năng giải quyết vấn đề, không phải học thuộc lòng.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-3',
        text: 'Việc chạy thử chương trình với các bộ dữ liệu khác nhau nhằm mục đích gì?',
        options: ['Để chương trình chạy nhanh hơn', 'Để tìm và sửa các lỗi logic còn sót lại', 'Để làm đẹp giao diện', 'Để nén dung lượng tệp'],
        correctAnswer: 1,
        explanation: 'Đây là bước kiểm thử (Testing) quan trọng trong phát triển phần mềm.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-4',
        text: 'Input của bài toán tính diện tích hình tròn là gì?',
        options: ['Diện tích S', 'Bán kính R', 'Số Pi', 'Chu vi C'],
        correctAnswer: 1,
        explanation: 'Để tính diện tích, ta cần biết bán kính đầu vào.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ps-5',
        text: 'Thuật toán là gì?',
        options: ['Một loại ngôn ngữ lập trình', 'Dãy các chỉ dẫn rõ ràng để giải quyết một vấn đề', 'Một thiết bị phần cứng', 'Tên một phần mềm'],
        correctAnswer: 1,
        explanation: 'Thuật toán là các bước logic để đi từ Input đến Output.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ps-6',
        text: 'Chia nhỏ vấn đề (Decomposition) giúp ích gì?',
        options: ['Làm vấn đề phức tạp hơn', 'Giúp giải quyết từng phần nhỏ dễ dàng hơn', 'Để tốn thêm thời gian', 'Để máy tính không hiểu được'],
        correctAnswer: 1,
        explanation: 'Chia để trị là kỹ thuật quan trọng trong lập trình.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ps-7',
        text: 'Trừu tượng hóa (Abstraction) là quá trình gì?',
        options: ['Vẽ tranh trừu tượng', 'Loại bỏ chi tiết thừa, tập trung vào đặc điểm chính', 'Viết mã nguồn thật dài', 'Cài đặt hệ điều hành'],
        correctAnswer: 1,
        explanation: 'Giúp đơn giản hóa mô hình bài toán.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-8',
        text: 'Tại sao cần lựa chọn thuật toán tối ưu?',
        options: ['Để chương trình chạy lâu hơn', 'Để tiết kiệm tài nguyên máy tính và thời gian xử lý', 'Để mã nguồn trông đẹp hơn', 'Để không ai hiểu được'],
        correctAnswer: 1,
        explanation: 'Hiệu suất là yếu tố then chốt trong giải quyết vấn đề.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-9',
        text: 'Lỗi cú pháp (Syntax error) xảy ra khi nào?',
        options: ['Khi thuật toán bị sai logic', 'Khi viết mã nguồn không đúng quy tắc của ngôn ngữ lập trình', 'Khi máy tính bị mất điện', 'Khi nhập sai dữ liệu đầu vào'],
        correctAnswer: 1,
        explanation: 'Trình biên dịch sẽ báo lỗi nếu bạn viết sai cú pháp.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-10',
        text: 'Lỗi logic (Logic error) nguy hiểm hơn lỗi cú pháp vì chương trình vẫn chạy nhưng cho kết quả sai.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Lỗi logic khó phát hiện hơn vì không có thông báo lỗi từ hệ thống.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-ps-11',
        text: 'Công cụ nào sau đây hỗ trợ tốt nhất cho việc mô phỏng thuật toán?',
        options: ['Microsoft Word', 'Sơ đồ khối (Flowchart)', 'Trình duyệt Chrome', 'Phần mềm nghe nhạc'],
        correctAnswer: 1,
        explanation: 'Sơ đồ khối giúp hình dung luồng xử lý của thuật toán.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ps-12',
        text: 'Trong Python, để lặp lại một hành động 10 lần, ta dùng cấu trúc nào?',
        options: ['if...else', 'for i in range(10)', 'print()', 'input()'],
        correctAnswer: 1,
        explanation: 'Vòng lặp for dùng để thực hiện các công việc lặp lại.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-ps-13',
        text: 'Việc nhận diện mẫu (Pattern Recognition) giúp chúng ta áp dụng giải pháp cũ cho vấn đề mới tương tự.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là một phần của tư duy máy tính.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-14',
        text: 'Độ phức tạp thuật toán thường được ký hiệu bằng gì?',
        options: ['Big O notation', 'Small X notation', 'Alpha notation', 'Beta notation'],
        correctAnswer: 0,
        explanation: 'Ký hiệu O lớn dùng để đánh giá hiệu suất thuật toán.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-ps-15',
        text: 'Một bài toán có thể có nhiều thuật toán giải khác nhau.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Quan trọng là chọn được thuật toán hiệu quả nhất.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-ps-16',
        text: 'Kiểm thử (Testing) chỉ cần thực hiện một lần duy nhất.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Cần kiểm thử nhiều lần với các trường hợp biên và dữ liệu sai.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-17',
        text: 'IDE (Integrated Development Environment) là gì?',
        options: ['Môi trường phát triển tích hợp', 'Một loại virus', 'Tên một thuật toán', 'Một thiết bị lưu trữ'],
        correctAnswer: 0,
        explanation: 'IDE cung cấp các công cụ viết code, gỡ lỗi và chạy chương trình.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-18',
        text: 'Thuật toán tìm kiếm nhị phân yêu cầu dãy dữ liệu phải được sắp xếp.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là điều kiện tiên quyết của tìm kiếm nhị phân.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-ps-19',
        text: 'Tại sao cần viết tài liệu hướng dẫn (Documentation) cho chương trình?',
        options: ['Để tốn giấy in', 'Để người khác (hoặc chính mình sau này) dễ hiểu và bảo trì mã nguồn', 'Để chương trình chạy nhanh hơn', 'Để máy tính không bị hỏng'],
        correctAnswer: 1,
        explanation: 'Tài liệu giúp mã nguồn trở nên bền vững và dễ phát triển.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-ps-20',
        text: 'Tư duy máy tính chỉ dành cho những người học lập trình chuyên nghiệp.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Đây là kỹ năng giải quyết vấn đề hữu ích trong mọi lĩnh vực đời sống.',
        type: 'true-false',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'g12-it-management',
    title: 'Nhóm nghề quản trị trong ngành CNTT',
    description: 'Tìm hiểu về các vị trí công việc quản lý và vận hành hệ thống công nghệ.',
    category: 'ICT',
    grade: 12,
    theory: `### 1. Quản trị dự án phần mềm (Project Manager)
- Lập kế hoạch, điều phối nguồn lực và giám sát tiến độ dự án.
- Là cầu nối giữa khách hàng và đội ngũ kỹ thuật.

### 2. Quản trị hệ thống (System Administrator)
- Đảm bảo hệ thống máy tính, máy chủ hoạt động ổn định và an toàn.
- Cài đặt, cấu hình và bảo trì phần cứng, phần mềm hệ thống.

### 3. Quản trị cơ sở dữ liệu (Database Administrator - DBA)
- Thiết kế, triển khai và bảo mật các hệ thống lưu trữ dữ liệu.
- Tối ưu hóa hiệu suất truy vấn và sao lưu dữ liệu định kỳ.

### 4. Quản trị mạng (Network Administrator)
- Thiết lập và quản lý hạ tầng mạng (LAN, WAN, Internet).
- Giám sát an ninh mạng và xử lý các sự cố kết nối.

**Ví dụ thực tế:**
Trong một ngân hàng, Quản trị viên CSDL đảm bảo thông tin tài khoản luôn chính xác, trong khi Quản trị viên mạng đảm bảo các máy ATM luôn kết nối được với hệ thống trung tâm.

**Ghi chú:** Nhóm nghề quản trị đòi hỏi sự kết hợp giữa kiến thức kỹ thuật chuyên sâu và kỹ năng quản lý, giao tiếp tốt.`,
    questions: [
      {
        id: 'q12-mg-1',
        text: 'Người chịu trách nhiệm chính trong việc đảm bảo máy chủ của công ty hoạt động 24/7 là ai?',
        options: ['Lập trình viên web', 'Quản trị hệ thống', 'Thiết kế đồ họa', 'Kiểm thử viên'],
        correctAnswer: 1,
        explanation: 'System Admin quản lý việc vận hành và bảo trì máy chủ.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-mg-2',
        text: 'Công việc nào sau đây là đặc thù của Quản trị viên cơ sở dữ liệu (DBA)?',
        options: ['Sửa chữa phần cứng máy tính', 'Thiết kế giao diện người dùng', 'Sao lưu và bảo mật dữ liệu', 'Lắp đặt hệ thống cáp mạng'],
        correctAnswer: 2,
        explanation: 'DBA tập trung vào tính toàn vẹn và an toàn của dữ liệu.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-3',
        text: 'Quản trị dự án (PM) không cần có kiến thức về kỹ thuật.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'PM cần hiểu kỹ thuật để ước lượng thời gian và quản lý đội ngũ hiệu quả.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-4',
        text: 'Quản trị mạng (Network Admin) làm công việc gì?',
        options: ['Viết code ứng dụng di động', 'Thiết lập và quản lý hạ tầng mạng LAN/WAN', 'Chỉnh sửa video', 'Bán máy tính'],
        correctAnswer: 1,
        explanation: 'Network Admin đảm bảo sự kết nối thông suốt trong tổ chức.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-mg-5',
        text: 'Vị trí nào là cầu nối giữa khách hàng và đội ngũ kỹ thuật trong một dự án CNTT?',
        options: ['Kiểm thử viên', 'Quản trị dự án (PM)', 'Nhân viên bảo vệ', 'Kế toán'],
        correctAnswer: 1,
        explanation: 'PM điều phối và đảm bảo dự án đáp ứng yêu cầu khách hàng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-mg-6',
        text: 'Tại sao Quản trị viên hệ thống cần thực hiện sao lưu (backup) dữ liệu thường xuyên?',
        options: ['Để làm đầy ổ cứng', 'Để đề phòng mất mát dữ liệu khi có sự cố phần cứng hoặc tấn công mạng', 'Để máy tính chạy nhanh hơn', 'Để nhân viên không truy cập được dữ liệu'],
        correctAnswer: 1,
        explanation: 'Backup là quy trình sống còn để bảo vệ dữ liệu.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-7',
        text: 'Kỹ năng nào là quan trọng nhất đối với một Quản trị dự án CNTT?',
        options: ['Chỉ cần biết gõ phím nhanh', 'Kỹ năng lập kế hoạch và quản lý con người', 'Kỹ năng sửa máy in', 'Kỹ năng chơi game'],
        correctAnswer: 1,
        explanation: 'PM cần quản lý thời gian, ngân sách và nhân sự hiệu quả.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-8',
        text: 'Chứng chỉ CCNA thường dành cho nhóm nghề nào?',
        options: ['Quản trị cơ sở dữ liệu', 'Quản trị mạng', 'Thiết kế web', 'Viết nội dung'],
        correctAnswer: 1,
        explanation: 'CCNA là chứng chỉ uy tín về mạng của Cisco.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-mg-9',
        text: 'Quản trị viên CSDL cần tối ưu hóa các câu lệnh SQL để làm gì?',
        options: ['Để mã nguồn trông phức tạp hơn', 'Để tăng tốc độ truy xuất dữ liệu', 'Để tốn thêm tài nguyên RAM', 'Để gây khó khăn cho người dùng'],
        correctAnswer: 1,
        explanation: 'Tối ưu hóa giúp hệ thống phản hồi nhanh hơn.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-mg-10',
        text: 'Vị trí "DevOps Engineer" là sự kết hợp giữa lập trình và quản trị vận hành.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'DevOps giúp rút ngắn chu kỳ phát triển phần mềm.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-mg-11',
        text: 'Khi có sự cố mạng Internet trong công ty, ai sẽ là người đầu tiên xử lý?',
        options: ['DBA', 'Network Admin', 'PM', 'Designer'],
        correctAnswer: 1,
        explanation: 'Đây là nhiệm vụ chuyên môn của Quản trị mạng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-mg-12',
        text: 'Quản trị viên hệ thống không cần quan tâm đến vấn đề bảo mật.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Bảo mật hệ thống là một trong những ưu tiên hàng đầu.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-mg-13',
        text: 'Vị trí CTO (Chief Technology Officer) là gì?',
        options: ['Giám đốc công nghệ', 'Nhân viên kỹ thuật', 'Người sửa máy tính', 'Lập trình viên tập sự'],
        correctAnswer: 0,
        explanation: 'CTO là vị trí quản lý cấp cao nhất về công nghệ trong doanh nghiệp.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-14',
        text: 'Nhóm nghề quản trị CNTT chỉ làm việc với máy móc, không cần giao tiếp với con người.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Họ cần phối hợp với nhiều phòng ban và khách hàng.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-15',
        text: 'Để trở thành DBA giỏi, bạn cần thành thạo ngôn ngữ nào?',
        options: ['HTML', 'CSS', 'SQL', 'Photoshop'],
        correctAnswer: 2,
        explanation: 'SQL là ngôn ngữ tiêu chuẩn để làm việc với CSDL.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-16',
        text: 'Công việc quản trị CNTT thường yêu cầu trực chiến (on-call) để xử lý sự cố khẩn cấp.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Hệ thống cần hoạt động ổn định liên tục.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-17',
        text: 'Phần mềm Jira thường được dùng trong lĩnh vực nào?',
        options: ['Chỉnh sửa ảnh', 'Quản trị dự án phần mềm', 'Nghe nhạc', 'Soạn thảo văn bản'],
        correctAnswer: 1,
        explanation: 'Jira là công cụ quản lý dự án theo mô hình Agile/Scrum phổ biến.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-mg-18',
        text: 'Quản trị viên mạng cần hiểu biết về các thiết bị như Router, Switch.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là các thiết bị phần cứng mạng cơ bản.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-mg-19',
        text: 'An toàn thông tin là trách nhiệm riêng của Quản trị viên hệ thống, các vị trí khác không cần quan tâm.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'An toàn thông tin là trách nhiệm chung của mọi thành viên.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-mg-20',
        text: 'Nhu cầu nhân lực cho nhóm nghề quản trị CNTT đang giảm dần do AI.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'AI hỗ trợ nhưng con người vẫn đóng vai trò quản lý và ra quyết định chiến lược.',
        type: 'true-false',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'g12-society-practical',
    title: 'Máy tính và xã hội tri thức',
    description: 'Vai trò của công nghệ trong xã hội hiện đại và thực hành kết nối thiết bị số.',
    category: 'ICT',
    grade: 12,
    theory: `### 1. Xã hội tri thức và Kinh tế tri thức
- **Xã hội tri thức**: Xã hội dựa trên việc sản xuất, phân phối và sử dụng tri thức.
- **Kinh tế tri thức**: Nền kinh tế mà tri thức là yếu tố quyết định sự tăng trưởng.

### 2. Thực hành kết nối thiết bị số
- **Kết nối có dây**:
    - USB: Kết nối chuột, bàn phím, ổ cứng di động.
    - HDMI/VGA: Kết nối máy tính với màn hình, máy chiếu.
    - LAN (Ethernet): Kết nối mạng Internet dây.
- **Kết nối không dây**:
    - Wi-Fi: Kết nối mạng không dây diện rộng.
    - Bluetooth: Kết nối tai nghe, loa, điện thoại trong phạm vi gần.
    - NFC: Kết nối chạm để thanh toán hoặc truyền dữ liệu cực gần.

### 3. Thành tựu của Tin học
- Chính phủ điện tử, Thương mại điện tử (Shopee, Lazada), Học tập trực tuyến.

**Ví dụ thực tế:**
Việc bạn đang sử dụng ứng dụng EduQuest này để học tập chính là một biểu hiện của việc ứng dụng công nghệ trong xã hội tri thức.

**Ghi chú:** Hiểu và làm chủ các thiết bị số là kỹ năng thiết yếu để hòa nhập và phát triển trong xã hội hiện đại.`,
    questions: [
      {
        id: 'q12-soc-1',
        text: 'Loại kết nối nào sau đây thường được dùng để kết nối máy tính với máy chiếu?',
        options: ['USB', 'HDMI', 'Bluetooth', 'NFC'],
        correctAnswer: 1,
        explanation: 'HDMI là chuẩn kết nối hình ảnh và âm thanh chất lượng cao phổ biến.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-soc-2',
        text: 'Trong xã hội tri thức, yếu tố nào đóng vai trò quan trọng nhất cho sự phát triển?',
        options: ['Tài nguyên thiên nhiên', 'Vốn đầu tư nước ngoài', 'Tri thức và công nghệ số', 'Lao động phổ thông'],
        correctAnswer: 2,
        explanation: 'Tri thức là động lực chính của xã hội hiện đại.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-soc-3',
        text: 'Bluetooth là một loại kết nối không dây phạm vi ngắn.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Bluetooth thường hoạt động tốt trong phạm vi dưới 10 mét.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-soc-4',
        text: 'Kinh tế tri thức là gì?',
        options: ['Nền kinh tế dựa trên khai thác khoáng sản', 'Nền kinh tế dựa trên sản xuất nông nghiệp thuần túy', 'Nền kinh tế dựa trên việc sản xuất và sử dụng tri thức', 'Nền kinh tế không cần dùng tiền'],
        correctAnswer: 2,
        explanation: 'Tri thức trở thành lực lượng sản xuất trực tiếp.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-soc-5',
        text: 'Cổng USB-C có ưu điểm gì so với USB truyền thống?',
        options: ['Chỉ cắm được một chiều', 'Tốc độ truyền dữ liệu nhanh hơn và có thể cắm cả hai chiều', 'Dễ hỏng hơn', 'Chỉ dùng để sạc pin'],
        correctAnswer: 1,
        explanation: 'USB-C là chuẩn kết nối hiện đại, đa năng và tiện lợi.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-soc-6',
        text: 'Chính phủ điện tử (e-Government) mang lại lợi ích gì cho người dân?',
        options: ['Phải đi lại nhiều hơn', 'Thực hiện các thủ tục hành chính trực tuyến nhanh chóng, minh bạch', 'Tốn thêm chi phí đi lại', 'Không cần dùng máy tính'],
        correctAnswer: 1,
        explanation: 'Giúp giảm bớt phiền hà và tiết kiệm thời gian cho người dân.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-soc-7',
        text: 'Thương mại điện tử (e-Commerce) là gì?',
        options: ['Mua bán hàng hóa tại chợ truyền thống', 'Mua bán hàng hóa và dịch vụ qua mạng Internet', 'Chỉ là việc quảng cáo trên tivi', 'Việc trao đổi hàng hóa bằng hiện vật'],
        correctAnswer: 1,
        explanation: 'Các nền tảng như Shopee, Lazada là ví dụ điển hình.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-soc-8',
        text: 'Kết nối NFC thường được ứng dụng trong việc gì?',
        options: ['Kết nối mạng Internet xuyên lục địa', 'Thanh toán không tiếp xúc (chạm để trả tiền)', 'Truyền video dung lượng lớn', 'Điều khiển máy bay không người lái'],
        correctAnswer: 1,
        explanation: 'NFC hoạt động ở khoảng cách cực gần (vài cm).',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-soc-9',
        text: 'Tại sao cần tắt Bluetooth khi không sử dụng?',
        options: ['Để máy tính không bị nóng', 'Để tiết kiệm pin và tránh các kết nối trái phép từ người lạ', 'Để tăng tốc độ Wi-Fi', 'Để màn hình sáng hơn'],
        correctAnswer: 1,
        explanation: 'Giúp bảo vệ thiết bị khỏi các nguy cơ bảo mật tiềm ẩn.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-soc-10',
        text: 'Học tập trực tuyến (e-Learning) chỉ hiệu quả khi có giáo viên đứng lớp trực tiếp.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'e-Learning cho phép học mọi lúc, mọi nơi với kho học liệu phong phú.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-soc-11',
        text: 'Cổng Ethernet (RJ45) dùng để kết nối thiết bị nào?',
        options: ['Chuột không dây', 'Cáp mạng LAN', 'Tai nghe', 'Thẻ nhớ'],
        correctAnswer: 1,
        explanation: 'Dùng cho kết nối mạng có dây ổn định.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-soc-12',
        text: 'Công nghệ 5G có đặc điểm gì nổi bật so với 4G?',
        options: ['Tốc độ chậm hơn', 'Độ trễ thấp và tốc độ truyền tải cực nhanh', 'Chỉ dùng được ở nông thôn', 'Tốn ít năng lượng hơn 100 lần'],
        correctAnswer: 1,
        explanation: '5G là nền tảng cho nhiều công nghệ tương lai như xe tự lái, phẫu thuật từ xa.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-soc-13',
        text: 'Việc số hóa dữ liệu là bước đầu tiên để xây dựng xã hội tri thức.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Chuyển đổi dữ liệu sang dạng số giúp lưu trữ và xử lý bằng máy tính.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-soc-14',
        text: 'Chuẩn kết nối nào sau đây hỗ trợ truyền cả hình ảnh và âm thanh chất lượng cao?',
        options: ['VGA', 'HDMI', 'DVI', 'S-Video'],
        correctAnswer: 1,
        explanation: 'HDMI là chuẩn phổ biến nhất hiện nay cho đa phương tiện.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-soc-15',
        text: 'Trong xã hội tri thức, việc học tập suốt đời (Lifelong learning) là không cần thiết.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Tri thức thay đổi nhanh chóng đòi hỏi con người phải cập nhật liên tục.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-soc-16',
        text: 'Khoa học dữ liệu (Data Science) giúp gì cho các doanh nghiệp?',
        options: ['Làm đẹp văn phòng', 'Phân tích dữ liệu để đưa ra quyết định kinh doanh chính xác', 'Giảm số lượng nhân viên', 'Tăng giá bán sản phẩm'],
        correctAnswer: 1,
        explanation: 'Dữ liệu là "dầu mỏ" mới của nền kinh tế tri thức.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-soc-17',
        text: 'Kết nối Wi-Fi 6 có khả năng phục vụ nhiều thiết bị cùng lúc tốt hơn các chuẩn cũ.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Wi-Fi 6 cải thiện hiệu suất trong môi trường đông đúc.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-soc-18',
        text: 'Tại sao cần sử dụng các phần mềm có bản quyền?',
        options: ['Để tốn tiền', 'Để nhận được các bản cập nhật bảo mật và hỗ trợ từ nhà sản xuất', 'Để máy tính chạy chậm hơn', 'Để không bị ai làm phiền'],
        correctAnswer: 1,
        explanation: 'Phần mềm lậu tiềm ẩn nhiều nguy cơ mã độc.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-soc-19',
        text: 'Chuyển đổi số (Digital Transformation) là quá trình thay đổi tổng thể và toàn diện của cá nhân, tổ chức về cách sống, cách làm việc dựa trên công nghệ số.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là xu thế tất yếu của thời đại.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-soc-20',
        text: 'Kỹ năng số (Digital Skills) bao gồm khả năng sử dụng máy tính, Internet và các công cụ số một cách an toàn, hiệu quả.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Đây là kỹ năng thiết yếu trong thế kỷ 21.',
        type: 'true-false',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'iot-12',
    title: 'Internet vạn vật (IoT)',
    description: 'Kết nối các thiết bị thông minh và ứng dụng của IoT.',
    category: 'NET',
    grade: 12,
    theory: `### 1. Khái niệm IoT
- IoT (Internet of Things) là mạng lưới các thiết bị vật lý được nhúng cảm biến, phần mềm để kết nối và trao đổi dữ liệu qua Internet.

### 2. Các thành phần của hệ thống IoT
- **Thiết bị thông minh**: Cảm biến, camera, thiết bị gia dụng.
- **Hạ tầng mạng**: Wi-Fi, 4G/5G, Bluetooth.
- **Hệ thống xử lý**: Điện toán đám mây, ứng dụng di động.

### 3. Ứng dụng IoT
- Nhà thông minh (Smart Home), Thành phố thông minh, Nông nghiệp thông minh.`,
    questions: [
      {
        id: 'q12-iot-1',
        text: 'IoT là viết tắt của cụm từ nào?',
        options: ['Internet of Things', 'Information of Technology', 'Input of Transfer', 'Internal of Tools'],
        correctAnswer: 0,
        explanation: 'IoT là Internet of Things - Mạng lưới vạn vật kết nối Internet.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-iot-2',
        text: 'Thiết bị nào sau đây có thể là một thành phần trong hệ thống IoT?',
        options: ['Bóng đèn thông minh', 'Cảm biến nhiệt độ', 'Khóa cửa vân tay kết nối Wi-Fi', 'Tất cả các đáp án trên'],
        correctAnswer: 3,
        explanation: 'Mọi thiết bị có khả năng kết nối và truyền dữ liệu đều có thể thuộc IoT.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-iot-3',
        text: 'Đâu là một ví dụ về ứng dụng IoT trong nông nghiệp?',
        options: ['Dùng máy cày chạy bằng dầu', 'Hệ thống tưới nước tự động dựa trên cảm biến độ ẩm đất', 'Việc nông dân dùng điện thoại để gọi điện', 'Việc dùng phân bón hóa học'],
        correctAnswer: 1,
        explanation: 'IoT giúp tối ưu hóa việc chăm sóc cây trồng dựa trên dữ liệu thực tế.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-iot-4',
        text: 'Thành phần "Cảm biến" trong hệ thống IoT có nhiệm vụ gì?',
        options: ['Xử lý dữ liệu phức tạp', 'Thu thập thông tin từ môi trường (nhiệt độ, ánh sáng, độ ẩm...)', 'Hiển thị kết quả cho người dùng', 'Cung cấp năng lượng cho hệ thống'],
        correctAnswer: 1,
        explanation: 'Cảm biến là "giác quan" của hệ thống IoT.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-iot-5',
        text: 'Tại sao công nghệ 5G lại quan trọng đối với sự phát triển của IoT?',
        options: ['Vì 5G có màu xanh', 'Vì 5G hỗ trợ kết nối hàng triệu thiết bị cùng lúc với độ trễ cực thấp', 'Vì 5G rẻ hơn Wi-Fi', 'Vì 5G không cần dùng ăng-ten'],
        correctAnswer: 1,
        explanation: 'Băng thông rộng và độ trễ thấp của 5G giúp IoT hoạt động mượt mà hơn.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-iot-6',
        text: 'Nhà thông minh (Smart Home) cho phép bạn làm gì?',
        options: ['Phải tự tay bật từng công tắc đèn', 'Điều khiển các thiết bị điện trong nhà từ xa qua điện thoại', 'Không cần dùng điện', 'Nhà tự biết nấu cơm mà không cần gạo'],
        correctAnswer: 1,
        explanation: 'Mang lại sự tiện nghi và tiết kiệm năng lượng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-iot-7',
        text: 'Vấn đề bảo mật trong IoT rất quan trọng vì các thiết bị này thường có cấu hình yếu và dễ bị tấn công.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Kẻ tấn công có thể chiếm quyền điều khiển thiết bị IoT để xâm nhập mạng nội bộ.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-iot-8',
        text: 'Điện toán đám mây (Cloud Computing) đóng vai trò gì trong IoT?',
        options: ['Lưu trữ và xử lý lượng dữ liệu khổng lồ từ các thiết bị gửi về', 'Làm cho thiết bị nặng hơn', 'Chỉ dùng để trang trí', 'Thay thế hoàn toàn cảm biến'],
        correctAnswer: 0,
        explanation: 'Cloud cung cấp tài nguyên tính toán mạnh mẽ cho IoT.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-iot-9',
        text: 'Thiết bị đeo thông minh (Wearables) như đồng hồ thông minh có phải là thiết bị IoT không?',
        options: ['Có', 'Không'],
        correctAnswer: 0,
        explanation: 'Chúng kết nối với điện thoại và Internet để truyền dữ liệu sức khỏe.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-iot-10',
        text: 'Giao thức MQTT thường được dùng trong IoT vì nó nhẹ và tiết kiệm băng thông.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'MQTT là giao thức phổ biến cho các thiết bị IoT có tài nguyên hạn chế.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-iot-11',
        text: 'Thành phố thông minh (Smart City) sử dụng IoT để làm gì?',
        options: ['Quản lý giao thông, rác thải và năng lượng hiệu quả hơn', 'Để xây thêm nhiều nhà cao tầng', 'Để cấm người dân dùng xe máy', 'Để tắt hết đèn đường'],
        correctAnswer: 0,
        explanation: 'Giúp nâng cao chất lượng cuộc sống đô thị.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-iot-12',
        text: 'RFID là một công nghệ nhận dạng bằng sóng vô tuyến thường dùng trong quản lý kho hàng IoT.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Giúp theo dõi vị trí và số lượng hàng hóa tự động.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-iot-13',
        text: 'Thiết bị IoT có thể hoạt động hoàn toàn độc lập mà không cần kết nối mạng.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Đặc điểm cốt lõi của IoT là sự kết nối (Connectivity).',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-iot-14',
        text: 'Ứng dụng của IoT trong y tế (IoMT) có thể giúp theo dõi nhịp tim bệnh nhân từ xa.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Giúp bác sĩ can thiệp kịp thời khi có dấu hiệu bất thường.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-iot-15',
        text: 'Việc lộ thông tin từ camera an ninh thông minh là một rủi ro quyền riêng tư nghiêm trọng.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Cần đổi mật khẩu mặc định và cập nhật phần mềm thường xuyên.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-iot-16',
        text: 'Edge Computing (Điện toán biên) giúp xử lý dữ liệu ngay tại thiết bị thay vì gửi hết lên đám mây.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Giúp giảm độ trễ và tiết kiệm băng thông mạng.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-iot-17',
        text: 'LPWAN là loại mạng diện rộng công suất thấp dành cho các thiết bị IoT dùng pin lâu năm.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Ví dụ như công nghệ LoRaWAN hoặc NB-IoT.',
        type: 'true-false',
        difficulty: 'hard'
      },
      {
        id: 'q12-iot-18',
        text: 'IoT giúp giảm thiểu lãng phí thực phẩm thông qua việc quản lý chuỗi cung ứng lạnh thông minh.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Giám sát nhiệt độ liên tục trong quá trình vận chuyển.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-iot-19',
        text: 'Mọi thiết bị điện tử trong tương lai đều sẽ trở thành thiết bị IoT.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Chỉ những thiết bị mang lại giá trị từ việc kết nối mới cần trở thành IoT.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-iot-20',
        text: 'Hệ thống gương thông minh có thể hiển thị thời tiết và tin nhắn là một ví dụ về IoT.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Nó kết nối Internet để lấy thông tin và hiển thị cho người dùng.',
        type: 'true-false',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'ethics-12',
    title: 'An toàn thông tin nâng cao',
    description: 'Pháp luật và đạo đức trong kỷ nguyên số, bảo mật dữ liệu cá nhân.',
    category: 'ICT',
    grade: 12,
    theory: `### 1. Tầm quan trọng của an toàn thông tin
- Bảo vệ quyền riêng tư, tài sản số và uy tín cá nhân/tổ chức.

### 2. Các biện pháp bảo mật mạnh
- **Mật khẩu phức tạp**: Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt.
- **Xác thực đa yếu tố (MFA/2FA)**: Thêm một lớp bảo vệ ngoài mật khẩu.
- **Mã hóa dữ liệu**: Đảm bảo dữ liệu không bị đọc trộm.

### 3. Pháp luật về an toàn thông tin
- Luật An ninh mạng Việt Nam quy định các hành vi bị cấm và trách nhiệm của người dùng.`,
    questions: [
      {
        id: 'q12-et-1',
        text: 'Mật khẩu nào sau đây được coi là an toàn nhất?',
        options: ['12345678', 'password', 'Admin@2024!', 'ngay-sinh-cua-toi'],
        correctAnswer: 2,
        explanation: 'Mật khẩu mạnh cần có độ dài hợp lý và kết hợp nhiều loại ký tự.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-et-2',
        text: 'Xác thực 2 lớp (2FA) là không cần thiết nếu đã có mật khẩu mạnh.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: '2FA cung cấp thêm một lớp bảo vệ cực kỳ quan trọng nếu mật khẩu bị lộ.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-et-3',
        text: 'Mã hóa dữ liệu giúp bảo vệ thông tin như thế nào?',
        options: ['Làm cho dữ liệu biến mất', 'Chuyển dữ liệu sang dạng không thể đọc được nếu không có khóa giải mã', 'Làm cho dữ liệu chạy nhanh hơn', 'Tự động xóa dữ liệu khi có người lạ xem'],
        correctAnswer: 1,
        explanation: 'Mã hóa đảm bảo tính bí mật của thông tin.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-et-4',
        text: 'Hành vi nào sau đây vi phạm Luật An ninh mạng?',
        options: ['Học tập trực tuyến', 'Phát tán thông tin sai sự thật, gây hoang mang dư luận', 'Mua hàng trên Shopee', 'Gửi email cho giáo viên'],
        correctAnswer: 1,
        explanation: 'Người dùng phải chịu trách nhiệm về thông tin mình đăng tải.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-et-5',
        text: 'Phần mềm độc hại (Malware) bao gồm những loại nào?',
        options: ['Virus, Sâu máy tính (Worm), Trojan', 'Phần mềm soạn thảo văn bản', 'Trình duyệt web', 'Hệ điều hành Windows'],
        correctAnswer: 0,
        explanation: 'Đây là các chương trình được thiết kế để gây hại cho hệ thống.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-et-6',
        text: 'Tại sao không nên click vào các link lạ trong email từ người gửi không xác định?',
        options: ['Vì link đó sẽ làm hỏng chuột', 'Vì có nguy cơ bị nhiễm mã độc hoặc bị lừa đảo chiếm đoạt tài khoản (Phishing)', 'Vì link đó tốn tiền điện', 'Vì link đó làm màn hình bị mờ'],
        correctAnswer: 1,
        explanation: 'Phishing là hình thức lừa đảo phổ biến để lấy cắp thông tin.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-et-7',
        text: 'Tường lửa (Firewall) có chức năng gì?',
        options: ['Dập tắt đám cháy máy tính', 'Kiểm soát lưu lượng mạng ra vào dựa trên các quy tắc bảo mật', 'Làm cho máy tính mát hơn', 'Tăng tốc độ xử lý CPU'],
        correctAnswer: 1,
        explanation: 'Firewall ngăn chặn các truy cập trái phép từ bên ngoài.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-et-8',
        text: 'Đạo đức số (Digital Ethics) yêu cầu chúng ta làm gì?',
        options: ['Sử dụng công nghệ để làm hại người khác', 'Tôn trọng quyền riêng tư và bản quyền của người khác trên mạng', 'Chỉ dùng máy tính khi có người lớn cho phép', 'Phải mua máy tính thật đắt tiền'],
        correctAnswer: 1,
        explanation: 'Cần hành xử văn minh và đúng pháp luật trong môi trường số.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-et-9',
        text: 'Việc sử dụng phần mềm bẻ khóa (crack) tiềm ẩn nguy cơ bị gắn mã độc theo dõi.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Các bản crack thường chứa virus hoặc phần mềm gián điệp.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-et-10',
        text: 'HTTPS an toàn hơn HTTP vì dữ liệu được truyền đi dưới dạng mã hóa.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 0,
        explanation: 'Chữ "S" là viết tắt của Secure (An toàn).',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-et-11',
        text: 'Khi phát hiện tài khoản mạng xã hội bị xâm nhập, hành động đầu tiên nên làm là gì?',
        options: ['Xóa luôn tài khoản', 'Đổi mật khẩu ngay lập tức và đăng xuất khỏi tất cả thiết bị', 'Khóc lóc và không làm gì', 'Nhắn tin mắng kẻ trộm'],
        correctAnswer: 1,
        explanation: 'Cần nhanh chóng giành lại quyền kiểm soát tài khoản.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-et-12',
        text: 'VPN (Virtual Private Network) giúp bảo mật như thế nào?',
        options: ['Làm máy tính chạy nhanh hơn', 'Tạo đường truyền mã hóa riêng tư trên mạng công cộng', 'Tự động diệt virus', 'Làm cho màn hình đẹp hơn'],
        correctAnswer: 1,
        explanation: 'VPN giúp ẩn địa chỉ IP và bảo vệ dữ liệu truyền tải.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-et-13',
        text: 'Kỹ thuật xã hội (Social Engineering) là gì?',
        options: ['Một môn học về xã hội', 'Cách lừa đảo dựa trên việc thao túng tâm lý con người', 'Cách lắp ráp máy tính', 'Cách dùng mạng xã hội'],
        correctAnswer: 1,
        explanation: 'Kẻ xấu lừa nạn nhân tự cung cấp thông tin bí mật.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-et-14',
        text: 'Sử dụng Wi-Fi công cộng không có mật khẩu để giao dịch ngân hàng là rất an toàn.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Dữ liệu có thể bị kẻ xấu trong cùng mạng đánh cắp dễ dàng.',
        type: 'true-false',
        difficulty: 'medium'
      },
      {
        id: 'q12-et-15',
        text: 'Tại sao cần cập nhật hệ điều hành thường xuyên?',
        options: ['Để tốn dung lượng ổ cứng', 'Để vá các lỗ hổng bảo mật mới phát hiện', 'Để máy tính trông mới hơn', 'Để thay đổi hình nền'],
        correctAnswer: 1,
        explanation: 'Các bản cập nhật thường đi kèm với các bản vá bảo mật quan trọng.',
        type: 'multiple-choice',
        difficulty: 'easy'
      },
      {
        id: 'q12-et-16',
        text: 'Chữ ký số (Digital Signature) dùng để làm gì?',
        options: ['Để trang trí văn bản', 'Để xác thực nguồn gốc và tính toàn vẹn của tài liệu điện tử', 'Để viết tên mình thật đẹp', 'Để máy in nhận diện được văn bản'],
        correctAnswer: 1,
        explanation: 'Nó có giá trị pháp lý tương đương chữ ký tay.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-et-17',
        text: 'Ransomware là loại mã độc dùng để làm gì?',
        options: ['Tăng tốc độ máy tính', 'Mã hóa dữ liệu để tống tiền người dùng', 'Làm đẹp giao diện', 'Tự động gửi email quảng cáo'],
        correctAnswer: 1,
        explanation: 'Nạn nhân phải trả tiền để lấy lại quyền truy cập dữ liệu.',
        type: 'multiple-choice',
        difficulty: 'medium'
      },
      {
        id: 'q12-et-18',
        text: 'Việc đặt mật khẩu là tên và ngày sinh của mình là một thói quen bảo mật tốt.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Đây là những thông tin dễ bị kẻ xấu đoán ra hoặc tìm thấy trên mạng.',
        type: 'true-false',
        difficulty: 'easy'
      },
      {
        id: 'q12-et-19',
        text: 'Nguyên tắc "Least Privilege" (Quyền hạn tối thiểu) trong bảo mật nghĩa là gì?',
        options: ['Cho phép mọi người truy cập mọi thứ', 'Chỉ cấp quyền vừa đủ để người dùng thực hiện công việc của họ', 'Không cấp quyền cho bất kỳ ai', 'Chỉ cấp quyền cho sếp'],
        correctAnswer: 1,
        explanation: 'Giúp hạn chế thiệt hại nếu một tài khoản bị xâm nhập.',
        type: 'multiple-choice',
        difficulty: 'hard'
      },
      {
        id: 'q12-et-20',
        text: 'An toàn thông tin là trách nhiệm của riêng các chuyên gia CNTT.',
        options: ['Đúng', 'Sai'],
        correctAnswer: 1,
        explanation: 'Mọi người dùng đều là một mắt xích trong hệ thống an ninh mạng.',
        type: 'true-false',
        difficulty: 'easy'
      }
    ]
  }
];

export type BadgeTier = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  tier: BadgeTier;
  xpBonus?: number;
  coinBonus?: number;
}

export const BADGES: Badge[] = [
  {
    id: 'tech-rookie',
    name: 'Tân Binh Công Nghệ',
    description: 'Hoàn thành 10 bài học và đạt chuỗi 3 ngày học liên tiếp.',
    icon: '🚀',
    requirement: '10_topics_3_streak',
    tier: 'Common'
  },
  {
    id: 'db-master',
    name: 'Bậc Thầy Dữ Liệu',
    description: 'Hoàn thành tất cả bài học về CSDL.',
    icon: '📊',
    requirement: 'complete_db_category',
    tier: 'Rare'
  },
  {
    id: 'perfect-score',
    name: 'Thiên Tài Tuyệt Đối',
    description: 'Đạt điểm tối đa trong một thử thách.',
    icon: '🌟',
    requirement: 'perfect_quiz',
    tier: 'Epic'
  },
  {
    id: 'legendary-scholar',
    name: 'Huyền Thoại Học Thuật',
    description: 'Duy trì chuỗi 30 ngày học liên tiếp và hoàn thành tất cả các chương học.',
    icon: '👑',
    requirement: '30_streak_all_topics',
    tier: 'Legendary',
    xpBonus: 2000,
    coinBonus: 1000
  },
  {
    id: 'sql-god',
    name: 'Thần SQL',
    description: 'Đạt điểm tối đa 10 lần liên tiếp trong các bài kiểm tra SQL khó.',
    icon: '⚡',
    requirement: '10_perfect_sql_hard',
    tier: 'Legendary',
    xpBonus: 2500,
    coinBonus: 1500
  },
  {
    id: 'streak-god',
    name: 'Thần Kiên Trì',
    description: 'Duy trì chuỗi học tập 100 ngày liên tiếp không ngắt quãng.',
    icon: '🔥',
    requirement: '100_streak',
    tier: 'Legendary',
    xpBonus: 5000,
    coinBonus: 3000
  }
];

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  targetValue: number; // Value needed for ONE completion
  maxCompletions: number; // Maximum times this can be earned
  rewardXp: number; // Reward per completion
  rewardCoins: number; // Reward per completion
  finalBonusXp?: number; // Extra reward when reaching maxCompletions
  finalBonusCoins?: number; // Extra reward when reaching maxCompletions
  category: 'learning' | 'quiz' | 'social' | 'streak';
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'data-sage',
    name: 'Nhà thông thái dữ liệu',
    description: 'Hoàn thành tất cả các bài học và thử thách liên quan đến Cơ sở dữ liệu và SQL.',
    icon: '🧠',
    targetValue: 2, // 2 topics (db-1 and sql-1)
    maxCompletions: 20,
    rewardXp: 200,
    rewardCoins: 100,
    finalBonusXp: 2000,
    finalBonusCoins: 1000,
    category: 'learning'
  },
  {
    id: 'info-king',
    name: 'Vua thông tin',
    description: 'Đạt tỷ lệ trả lời đúng trên 95% trong các bài kiểm tra.',
    icon: '🤴',
    targetValue: 1, // 1 quiz with >= 95%
    maxCompletions: 50,
    rewardXp: 100,
    rewardCoins: 50,
    finalBonusXp: 5000,
    finalBonusCoins: 2500,
    category: 'quiz'
  },
  {
    id: 'streak-master',
    name: 'Bậc thầy kiên trì',
    description: 'Duy trì chuỗi học tập 7 ngày liên tiếp.',
    icon: '🔥',
    targetValue: 7,
    maxCompletions: 10,
    rewardXp: 300,
    rewardCoins: 100,
    category: 'streak'
  },
  {
    id: 'perfect-week',
    name: 'Tuần lễ hoàn hảo',
    description: 'Hoàn thành 7 bài học với điểm tối đa trong vòng 1 tuần.',
    icon: '📅',
    targetValue: 7,
    maxCompletions: 5,
    rewardXp: 1200,
    rewardCoins: 600,
    category: 'quiz'
  }
];

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  type: 'avatar' | 'theme' | 'pet';
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'item1', name: 'Mũ Hacker', price: 100, icon: '🎩', type: 'avatar' },
  { id: 'item2', name: 'Rồng Code', price: 500, icon: '🐲', type: 'pet' },
  { id: 'item3', name: 'Giao diện Dark Mode Pro', price: 200, icon: '🌙', type: 'theme' },
  { id: 'item4', name: 'Kính VR Siêu Cấp', price: 300, icon: '🥽', type: 'avatar' },
];
