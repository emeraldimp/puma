<?php

  function AddSubscriptionPeriod($startDate, $periodString)
  {
      $periodInfo = explode(' ',$periodString);

      $month = date('m', $startDate) + getMonth($periodInfo);
      $day = date('d', $startDate) + getDay($periodInfo);
      $year = date('Y', $startDate) + getYear($periodInfo);

      $newDate = mktime(0,0,0, $month, $day, $year);

      return date("Ymd", $newDate);
  }

  function getMonth($periodInfo)
  {
      if ($periodInfo[1] == 'M') return $periodInfo[0];
      return 0;
  }
  
  function getYear($periodInfo)
  {
      if ($periodInfo[1] == 'Y') return $periodInfo[0];
      return 0;
  }
  
  function getDay($periodInfo)
  {
      if ($periodInfo[1] == 'D') return $periodInfo[0];
      if ($periodInfo[1] == 'W') return 7 * $periodInfo[0];
      return 0;
  }
?>
