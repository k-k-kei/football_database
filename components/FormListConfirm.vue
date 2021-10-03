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

                <!-- チームレベル -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block text-sm font-medium text-gray-700"
                    >チームレベル</label
                  >
                  {{ form.level }}
                </div>

                <!-- 主な活動場所 -->
                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >主な活動場所</label
                  >
                  {{ form.area }}
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
