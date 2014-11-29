<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {



	public function index()
	{
        $this->load->helper('url');

        if(empty($_GET['code'])){
            $token_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx305444f09047bca0&redirect_uri=' . urlencode('http://182.92.64.207/icbc_wechat_game/') . '&response_type=code&scope=snsapi_base&state=index#wechat_redirect';
            redirect($token_url);
        }

        $token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx305444f09047bca0&secret=5e1acad864a281a42df738ebad913c52&code=' . $_GET['code'] . '&grant_type=authorization_code';
        $result_json = file_get_contents($token_url);
        $result_arr = json_decode($result_json, true);
        if(!empty($result_arr['errcode'])){
//            die('Authorization failure!' .  $result_arr['errmsg'] . '</h1>');
            redirect('http://182.92.64.207/icbc_wechat_game/');
        }

        echo '<pre>';
        var_dump($result_arr);
        echo '</pre>';


        /*






        $this -> load -> model('quan_model');

        //查询用户是否已中过优惠券，已中出则不在中
        $data = array();
        if($this -> quan_model -> checkquan($result_arr['openid'])){
            $data['quan'] = 1;
        }else{
            $data['quan'] = 2;
        }



        //区分windows phone 平台
        if(strpos($_SERVER["HTTP_USER_AGENT"], 'Windows Phone')){
            $data['isWin'] = '1';
        }else{
            $data['isWin'] = '2';
        }

        //open id
        $data['openid'] = $result_arr['openid'];


        */
//        $this->load->view('welcome');
	}


}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */