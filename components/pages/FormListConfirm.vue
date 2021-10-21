<template>
  <div>
    <div>
      <div>
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <!-- アップロードエリア -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    チームプロフィール画像
                  </label>

                  <!-- アップロード画像ビューエリア -->
                  <div
                    class="mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded-md"
                  >
                    <img :src="form.showImage" class="h-full w-full" />
                  </div>
                </div>

                <!-- チーム名入力 -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >チーム名</label
                  >
                  {{ form.name }}
                </div>

                <!-- 競技種目 -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block text-sm font-medium text-gray-700"
                    >競技種目</label
                  >
                  {{ form.category }}
                </div>

                <!-- チームレベル -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block text-sm font-medium text-gray-700"
                    >競技レベル</label
                  >
                  {{ form.level }}
                </div>

                <!-- 試合へのモチベーション -->
                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >試合へのモチベーション</label
                  >
                  {{ form.motibation }}
                </div>

                <!-- 都道府県 -->
                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >都道府県</label
                  >
                  {{ form.area1 }}
                </div>

                <!-- よく活動する市町村区① -->
                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >よく活動する市町村区①</label
                  >
                  {{ form.area2 }}
                </div>

                <!-- よく活動する市町村区② -->
                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >よく活動する市町村区②</label
                  >
                  {{ form.area3 }}
                </div>

                <!-- チーム自己紹介 -->
                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >チーム自己紹介</label
                  >
                  {{ form.selfIntroduction }}
                </div>
              </div>
            </div>
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: Object
  }
};
</script>
