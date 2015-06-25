<?
error_reporting('E_ALL');

$total = intval($_POST['total']);
$people = intval($_POST['people']);

class calcRemainException extends Exception
{
    protected $res;     // 100원 단위로 나눈 금액
    protected $remain;  // 나누고 남은 금액

    public function __construct($total, $people, $code = 0)
    {
        $this->res = floor($total / $people / 100) * 100;
        $this->remain = $total - $this->res * $people;

        $msg = $this->res . '원씩 나눈 후, ';
        $msg .= $this->remain . '원이 남습니다.';

        parent::__construct($msg, $code);
    }
}

try
{
    if($total < 1000)
    {
        throw new Exception('금액을 1000원 이상으로 입력해주세요.', 1);
    }

    if($people <= 0)
    {
        throw new Exception('사람 수를 1명 이상으로 입력해주세요.', 2);
    }

    if($total % $people != 0)
    {
        throw new calcRemainException($total, $people, 3);
    }

    $s = floor($total / $people) . '원입니다!';
}
catch(Exception $e)
{
    $s = $e->getMessage() . ' (오류코드:' . $e->getCode() . ')';
}
catch(calcRemainException $e)
{
    $s = $e->getMessage();
}

echo $s;
?>