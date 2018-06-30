export function mapUrl(inputUrl){
  // var prefix = "http://116.62.199.173:8080/app/mock/16";
  var prefix = "http://118.89.229.204:8080/server-0.0.1-SNAPSHOT";
  // var prefix = "http://localhost:8080";//后端协同测试(本地)

  var suffix = "";

  // var prefix = "http://localhost";   //前端本地测试
  // suffix =  ".php";

  var m = new Map([
    //模板：
    //['',''],
    ['conference','/api/conference'],
    ['signOut','/user/sign_out'],
    ['signUp','/user/sign_up'],
    ['test','/Hello'],
    ['searchExpert','/public/search_expert'],
    ['getExpertInfo','/public/get_expert_info'],
    ['getPaperInfo','/public/get_paper_info'],
    ['getPatentInfo','/public/get_patent_info'],
    ['getAchieveInfo','/public/get_achievement_info'],
    ['buyCredit','/user_auth/buy_credit'],
    ['changeProfile','/user_auth/change_profile'],
    ['getProfile','/user_auth/get_profile'],
    ['uploadMedia','/user_auth/upload_media'],
    ['buyService','/user_auth/buy_service'],
    ['getWordCount','/public/get_word_count'],
    ['analyseExpertNetwork','/public/analyse_expert_network'],
    ['getExpertApply','/admin/get_expert_apply'],
    ['proccessApply','/admin/process_apply'],
    ['getPayedServiceList','/user_auth/get_payed_services'],
    ['applyForExpert','/expert/apply_expert'],
    ['searchService','/public/search_service'],
    ['getPaperDetail','/public/get_paper_detail']
  ]);
  var  res = prefix+m.get(inputUrl)+suffix;
  return res;
};
