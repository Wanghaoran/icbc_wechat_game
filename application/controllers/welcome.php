<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {


    public function logincheck(){
        echo '<pre>';
        var_dump($_POST);
        var_dump($_GET);
        echo '</pre>';
    }


	public function index()
	{

        //生成跳转URL
        $callback_url = 'http://icbc.cnhtk.cn/logincheck';
        $scope = 'snsapi_userinfo';
        $state = 'index';
        $encode = '';
        $ts = time();
        $signature = $this -> signature(array(
            'nineteen@partner',
            'nineteen',
            $scope,
            $state,
            $callback_url,
            $encode,
            $ts
        ));

        $form = array(
            'app_key' => 'nineteen',
            'scope' => $scope,
            'state' => $state,
            'redirect' => $callback_url,
            'encode' => $encode,
            'ts' => $ts,
            'signature' => $signature,
        );

        $qs = http_build_query($form);
        $token_url = 'https://oauth.izhida.cn/oauth_v2?' . $qs;

        $this->load->helper('url');

        redirect($token_url);

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


    public function signature($arr)
    {
        sort($arr, SORT_STRING);
        $tmpStr = implode($arr);
        $tmpStr = sha1($tmpStr);
        return $tmpStr;
    }


}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */