import React from "react";
import VietTaxiNavbar from "./VietTaxiNavbar";
import VietTaxiFooter from "./VietTaxiFooter";
import ZaloContactButton from "./ZaloContactButton";

export default function PrivacyPolicy() {
  return (
    <>
      <VietTaxiNavbar />

      <div className="min-h-screen bg-black text-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="md:text-3xl text-2xl pt-8 font-bold text-center text-yellow-400 mb-8">
            CHÍNH SÁCH BẢO MẬT
          </h1>

          <div className="space-y-8 text-gray-300 leading-8">
            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                1. Thu thập thông tin
              </h2>
              <p className="text-sm md:text-lg">
                Chúng tôi có thể thu thập các thông tin như họ tên, số điện
                thoại, địa điểm đón/trả khách nhằm phục vụ việc đặt xe và chăm
                sóc khách hàng.
              </p>
            </section>

            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                2. Mục đích sử dụng
              </h2>
              <p className="text-sm md:text-lg">
                Thông tin khách hàng được sử dụng để xác nhận chuyến xe, liên hệ
                hỗ trợ và nâng cao chất lượng dịch vụ.
              </p>
            </section>

            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                3. Bảo mật thông tin
              </h2>
              <p className="text-sm md:text-lg">
                Chúng tôi cam kết không chia sẻ hoặc bán thông tin khách hàng
                cho bên thứ ba khi chưa có sự đồng ý từ khách hàng.
              </p>
            </section>

            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                4. Quyền của khách hàng
              </h2>
              <p className="text-sm md:text-lg">
                Khách hàng có quyền yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân
                bất kỳ lúc nào bằng cách liên hệ với chúng tôi.
              </p>
            </section>

            <section>
              <h2 className="md:text-2xl text-lg font-semibold text-white mb-3">
                5. Liên hệ
              </h2>
              <p className="text-sm md:text-lg">
                Nếu có câu hỏi liên quan đến chính sách bảo mật, vui lòng liên
                hệ hotline hoặc Zalo hỗ trợ của chúng tôi.
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
