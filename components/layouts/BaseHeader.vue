<template>
    <div>
        <div class="shadow">
            <div class="h-14  items-center text-center flex justify-between mx-3 md:mx-8">
                <div class="h-6 md:h-8">
                    <a href="/">
                        <svg class="h-full w-full" fill="none" height="15" viewBox="0 0 75 15" width="75" xmlns="http://www.w3.org/2000/svg"><path d="m36.916 3.6-2.148 6.42-2.124-6.42h-1.44l-2.172 6.384-2.088-6.384h-1.62l2.784 8.4h1.668l2.112-6.216 2.076 6.216h1.656l2.784-8.4zm6.4267 1.92c-.888 0-1.644.288-2.136.816v-3.24h-1.5v8.904h1.5v-3.24c0-1.284.72-1.932 1.788-1.932.96 0 1.524.552 1.524 1.692v3.48h1.5v-3.672c0-1.932-1.14-2.808-2.676-2.808zm5.3348-.984c.564 0 .96-.408.96-.936 0-.492-.408-.864-.96-.864s-.96.396-.96.9.408.9.96.9zm-.756 7.464h1.5v-6.408h-1.5zm5.4488.084c1.8 0 2.904-.78 2.904-1.98 0-2.508-3.96-1.356-3.96-2.652 0-.42.432-.72 1.344-.72.612 0 1.224.12 1.836.48l.576-1.14c-.576-.348-1.548-.552-2.4-.552-1.728 0-2.82.792-2.82 2.004 0 2.556 3.96 1.404 3.96 2.628 0 .444-.396.708-1.344.708-.804 0-1.668-.264-2.232-.636l-.576 1.14c.576.408 1.644.72 2.712.72zm7.6277-1.5c-.228.18-.528.264-.84.264-.576 0-.888-.336-.888-.96v-3.048h1.716v-1.2h-1.716v-1.464h-1.5v1.464h-1.056v1.2h1.056v3.084c0 1.416.804 2.16 2.208 2.16.54 0 1.08-.144 1.44-.432zm1.654 1.416h1.5v-8.904h-1.5zm9.4927-3.168c0-2.004-1.368-3.312-3.24-3.312-1.908 0-3.312 1.368-3.312 3.276s1.392 3.288 3.54 3.288c1.104 0 2.004-.36 2.58-1.044l-.804-.924c-.456.468-1.02.696-1.74.696-1.116 0-1.896-.6-2.076-1.536h5.028c.012-.144.024-.324.024-.444zm-3.24-2.112c.984 0 1.692.636 1.812 1.56h-3.636c.144-.936.852-1.56 1.824-1.56z" fill="#000"/><circle cx="18.2093" cy="8.7511" fill="#ffe381" r="4.17514"/><path clip-rule="evenodd" d="m16.7006 3.8801h-8.92913v2.1369c.26511-.03251.53613-.04933.81173-.04933 2.8626 0 5.2307 1.81459 5.6246 4.17513h2.4928z" fill="#f1d675" fill-rule="evenodd"/><circle cx="16.8176" cy="10.1428" fill="#f1d675" r="3.47928"/><path d="m8.58948 1.42217 10.73602 3.06992-.8286 2.89772-10.72542-3.50972z" fill="#ffe381"/><g clip-rule="evenodd" fill="#c4c4c4" fill-rule="evenodd"><path d="m6.83335 1.8204c-.25662-.0586-.53405-.03453-.79027.08716-.60557.28764-.86331 1.01172-.57567 1.6173.1217.25622.32154.45017.55747.5669-.34989-.0799-.66109-.31349-.82702-.66285-.28764-.60557-.0299-1.32966.57567-1.61729.34935-.16593.73814-.15037 1.05982.00878z"/><path d="m5.29283 1.18584c-.31674-.10214-.66883-.10246-1.00498.02253-.79447.29541-1.19903 1.17893-.90362 1.9734.12499.33614.35526.60248.63951.77553-.43185-.13926-.798-.46782-.96842-.92614-.29541-.79447.10915-1.67799.90362-1.9734.45833-.170425.9463-.107886 1.33389.12808z"/><path d="m2.83737.558541c-.32723-.098295-.68864-.091343-1.0311.043903-.809406.319654-1.206426 1.234936-.886771 2.044346.135251.34247.377141.61112.672531.78289-.44619-.13403-.828834-.46373-1.013244-.93068-.319655-.8094.077366-1.724684.886774-2.044339.46692-.184402.96909-.130303 1.37181.10388z"/></g><path d="m17.3736 4.17514h1.39171v2.3141h-1.39171z" fill="#727272" transform="matrix(.95677603 .29082577 -.29082577 .95677603 1.965194 -4.872224)"/></svg>
                    </a>
                </div>
                <ul class="flex justify-between items-center text-sm mt-1 md:text-base">
                    <div class="hidden md:block">
                        <AppBarDesktop />
                    </div>
                    <li class="ml-4 md:ml-8 p-2"><NuxtLink to="/auth/login">ログイン</NuxtLink></li>
                    <li class="ml-4 md:ml-8 p-2 bg-red-400 text-white rounded-lg"><NuxtLink to="/auth/signUp">新規登録</NuxtLink></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import AppBarDesktop from "~/components/layouts/AppBarDesktop"

export default {
  components: {
    AppBarDesktop
  }
}
</script>