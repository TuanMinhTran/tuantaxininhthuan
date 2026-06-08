import React from "react";
import VietTaxiNavbar from "./VietTaxiNavbar";
import VietTaxiFooter from "./VietTaxiFooter";
import ZaloContactButton from "./ZaloContactButton";

export default function Terms() {
  return (
    <>
      <VietTaxiNavbar />

      <div className="min-h-screen bg-black text-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="md:text-3xl text-2xl pt-8 text-center font-bold text-yellow-400 mb-8">
            ĐIỀU KHOẢN SỬ DỤNG
          </h1>

          <div className="space-y-8 text-gray-300 leading-8">
            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                1. Giới thiệu
              </h2>
              <p className="text-sm md:text-lg">
                Khi sử dụng dịch vụ đặt xe tại website của chúng tôi, khách hàng
                đồng ý với các điều khoản và điều kiện được nêu dưới đây.
              </p>
            </section>

            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                2. Thông tin đặt xe
              </h2>
              <p className="text-sm md:text-lg">
                Khách hàng cần cung cấp thông tin chính xác bao gồm họ tên, số
                điện thoại, địa điểm đón và thời gian sử dụng dịch vụ.
              </p>
            </section>

            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                3. Xác nhận chuyến
              </h2>
              <p className="text-sm md:text-lg">
                Sau khi gửi yêu cầu đặt xe, hệ thống hoặc nhân viên sẽ liên hệ
                để xác nhận chuyến đi trước khi thực hiện dịch vụ.
              </p>
            </section>

            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                4. Hủy chuyến
              </h2>
              <p className="text-sm md:text-lg">
                Khách hàng vui lòng thông báo sớm nếu muốn hủy chuyến để tránh
                ảnh hưởng lịch trình tài xế.
              </p>
            </section>

            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                5. Trách nhiệm dịch vụ
              </h2>
              <p className="text-sm md:text-lg">
                Chúng tôi cam kết hỗ trợ khách hàng trong khả năng tốt nhất, tuy
                nhiên không chịu trách nhiệm với các trường hợp bất khả kháng
                như: thiên tai, tai nạn, tắc đường hoặc sự cố ngoài ý muốn.
              </p>
            </section>
          </div>
        </div>
      </div>

      <VietTaxiFooter />
      <ZaloContactButton zaloId="0827524105" />
    </>
  );
}
