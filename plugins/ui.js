import Vue from "vue"

import BaseTitleHeader from "~/components/ui/BaseTitleHeader"
import BaseSelectBox from "~/components/ui/BaseSelectBox"
import BaseInputForm from "~/components/ui/BaseInputForm"
import BaseInputDatetime from "~/components/ui/BaseInputDatetime"
import BaseSearchBox from "~/components/ui/BaseSearchBox"
import BaseBannerButton from "~/components/ui/BaseBannerButton"

// 他の mixin と衝突しないように
// フラグの名前は必ずユニークなものにしてください。
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    components: {
        BaseTitleHeader,
        BaseSelectBox,
        BaseInputForm,
        BaseInputDatetime,
        BaseSearchBox,
        BaseBannerButton
    }
  })
}