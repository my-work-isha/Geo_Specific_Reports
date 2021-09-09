const express = require('express');
const router = express.Router();
var ibmdb = require('ibm_db');
var settings = require('../../settings');


//process.env.APP_ENV is undefined for local environment
console.log("Current environment = " + process.env.APP_ENV);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

//getuser functionality
router.get('/getuser', function (req, res) {
  let user = req.user['_json'];
  res.json(user);
});


// AP daily status

router.get("/apdailystatus", function (request, response) {
  
  
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
       //conn.query("SELECT BID_GEO_CD,REGION, CUST_CTRY_NAME AS COUNTRY,CURRENT_MONTH_BID,TO_CHAR(BID_DATE, 'YYYY-MM-DD HH24:MI:SS' ) as BID_DATE,AGING,BID_ID,SAP_QUOTE_NUM AS ADDITIONAL_ID,TRACKER_ID,BRAND,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(10,2)) AS REVENUE,CUST_NAME AS CUSTOMER_NAME,CFP,TIER1_NAME AS DISTRIBUTOR_NAME,OPERATION_OWNER AS OO_NAME ,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD='AP' and STATUS='OPEN') or (BID_GEO_CD='AP' and STATUS='CLOSED' and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(CREATED_DATE)))) < 24)));",
       //updated query on 20tNov
      //  conn.query("SELECT DISTINCT BID_GEO_CD,REGION, CUST_CTRY_NAME AS COUNTRY,CURRENT_MONTH_BID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,AGING,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID,TRACKER_ID,BRAND,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE,CUST_NAME AS CUSTOMER_NAME,CFP,TIER1_NAME AS DISTRIBUTOR_NAME,OPERATION_OWNER AS OO_NAME ,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD='AP' and STATUS='OPEN') or (BID_GEO_CD='AP' and STATUS='CLOSED' and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(CREATED_DATE)))) < 24)));",
      // updated query on 29th Dec
      //conn.query("SELECT DISTINCT BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CURRENT_MONTH_BID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,AGING,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID,TRACKER_ID,BRAND,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE,CUST_NAME AS CUSTOMER_NAME,CFP,TIER1_NAME AS DISTRIBUTOR_NAME,OPERATION_OWNER AS OO_NAME ,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,TENDER_STAGE from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD='AP' and STATUS='OPEN') or (BID_GEO_CD='AP' and STATUS='CLOSED' and REMEDIATION_CLOSED_DATE is not NULL and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(REMEDIATION_CLOSED_DATE)))) < 24)));",
      // conn.query("SELECT DISTINCT BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CURRENT_MONTH_BID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,AGING,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID,TRACKER_ID,BRAND,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE,CUST_NAME AS CUSTOMER_NAME,CFP,TIER1_NAME AS DISTRIBUTOR_NAME,OPERATION_OWNER AS OO_NAME ,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,TENDER_STAGE,OUTCOME from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD='AP' and STATUS='OPEN') or (BID_GEO_CD='AP' and STATUS='CLOSED' and REMEDIATION_CLOSED_DATE is not NULL and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(REMEDIATION_CLOSED_DATE)))) < 24)));",
      //Modified on Aug 6th 2020 - Added COC Reviewer column 
      conn.query("SELECT DISTINCT BID_GEO_CD,REGION, CUST_CTRY_NAME AS COUNTRY,CURRENT_MONTH_BID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,AGING,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID,TRACKER_ID,BRAND,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE,CUST_NAME AS CUSTOMER_NAME,CFP,TIER1_NAME AS DISTRIBUTOR_NAME,OPERATION_OWNER AS OO_NAME ,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,TENDER_STAGE,OUTCOME,ASSIGNED_TO AS REVIEWER from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD='AP' and STATUS='OPEN') or (BID_GEO_CD='AP' and STATUS='CLOSED' and REMEDIATION_CLOSED_DATE is not NULL and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(REMEDIATION_CLOSED_DATE)))) < 24)));",
      function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err)
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
})

// EMEA daily status
router.get("/emeadailystatus", function (request, response) {
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
      // conn.query("SELECT DISTINCT OUTCOME ,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,BID_ID,TRACKER_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,DIV,BRAND,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD in ('CE','EA','EP')  and STATUS='OPEN') or (BID_GEO_CD in ('CE','EA','EP') and STATUS='CLOSED' and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(CREATED_DATE)))) < 24)));",  
      //updated query on 29th dec 2019
      //conn.query("SELECT DISTINCT OUTCOME ,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,BID_ID,TRACKER_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,DIV,BRAND,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD in ('CE','EA','EP')  and STATUS='OPEN') or (BID_GEO_CD in ('CE','EA','EP') and STATUS='CLOSED' and REMEDIATION_CLOSED_DATE is not NULL and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(REMEDIATION_CLOSED_DATE)))) < 24)));",    
      //Updated on March 26th 2020
      conn.query("SELECT DISTINCT OUTCOME ,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,BID_ID,TRACKER_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,DIV,BRAND,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD in ('EMEA')  and STATUS='OPEN') or (BID_GEO_CD in ('EMEA') and STATUS='CLOSED' and REMEDIATION_CLOSED_DATE is not NULL and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(REMEDIATION_CLOSED_DATE)))) < 24)));",    
            function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err)
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
})

// GCG daily status
router.get("/gcgdailystatus", function (request, response) {
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
      //   conn.query("SELECT DISTINCT OUTCOME,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,TRACKER_ID,BID_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD ='GC'  and STATUS='OPEN') or (BID_GEO_CD ='GC' and STATUS='CLOSED' and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(CREATED_DATE)))) < 24)));",
      //updated query on 29thdec
      conn.query("SELECT DISTINCT OUTCOME,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,TRACKER_ID,BID_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD ='GC'  and STATUS='OPEN') or (BID_GEO_CD ='GC' and STATUS='CLOSED' and REMEDIATION_CLOSED_DATE is not NULL and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(REMEDIATION_CLOSED_DATE)))) < 24))) ;",
          function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err);
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
})

// LA daily status
router.get("/ladailystatus", function (request, response) {
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
       // conn.query("SELECT DISTINCT OUTCOME AS OUTCOME,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,TRACKER_ID,BID_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD ='LA'  and STATUS='OPEN') or (BID_GEO_CD ='LA'  and STATUS='CLOSED' and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(CREATED_DATE)))) < 24)));",
       //updated query on 29thDec
       conn.query("SELECT DISTINCT OUTCOME AS OUTCOME,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,TRACKER_ID,BID_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG,ACTION_OWNER AS ACTION,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE from BRTRMD.V_RMD_TRACKER_RPT WHERE ((BID_GEO_CD ='LA'  and STATUS='OPEN') or (BID_GEO_CD ='LA'  and STATUS='CLOSED' and REMEDIATION_CLOSED_DATE is not NULL and ((timestampdiff(8,char(current_TIMESTAMP-timestamp(REMEDIATION_CLOSED_DATE)))) < 24)));",
          function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err);
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
})

// api to get Executive status report data
router.get("/execreport", function (request, response) {
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
  //conn.query("SELECT DISTINCT B.BID_GEO_CD,COALESCE(B.REGION,B.BID_GEO_CD) AS REGION,B.CUST_CTRY_NAME AS COUNTRY,B.BRAND,B.CFP,A.BID_ID,B.CUST_NAME AS CUSTOMER_NAME,CAST(ROUND((B.PRICE_TO_BP)/1000000,2) AS DECIMAL(19,2)) AS REVENUE,CASE WHEN UPPER(B.BID_FACTOR_LIST) LIKE '%FOCUS BP%' THEN REPLACE(REPLACE(REPLACE(REPLACE(concat(LEFT(B.BID_FACTOR_LIST, LOCATE(':',B.BID_FACTOR_LIST)-1),REPLACE(SUBSTR(B.BID_FACTOR_LIST,varchar(LOCATE(';×',B.BID_FACTOR_LIST)+1), LENGTH(varchar(B.BID_FACTOR_LIST))+1),';×', '×')),'×',', '),'Confidentiality','NDA'),'FOCUS BP','Focus BP'),',',', ')ELSE REPLACE(REPLACE(REPLACE(B.BID_FACTOR_LIST,'×',', '),'Confidentiality','NDA'),',',', ')END  BID_FACTOR_LIST,B.AGING,M.EXECUTIVE_LOG from BRTRMD.V_RMD_TRACKER_RPT B LEFT OUTER JOIN  (select bid_id,max(tracker_id) tracker_id from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) A ON B.bid_id=A.bid_id AND B.tracker_id = A.tracker_id , (select bid_id,cast(LISTAGG(cast(executive_log AS VARCHAR(20000)), ',') as varchar(20000)) as EXECUTIVE_LOG,tracker_id from (select bid_id,case when executive_log IS NOT NULL THEN REPLACE(executive_log,SUBSTR(executive_log,6,5),' ') ELSE executive_log END AS executive_log,tracker_id from(select bid_id,tracker_id,section_id,max(action_id),max(log_date),executive_log from BRTRMD.V_RMD_TRACKER_RPT where (bid_id,tracker_id) in (select bid_id ,max(tracker_id) from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) group by bid_id,tracker_id,section_id,executive_log))C GROUP BY C.BID_ID,tracker_id) M WHERE  (B.STATUS='OPEN' and ((timestampdiff(8,char(CURRENT_TIMESTAMP-timestamp(B.CREATED_DATE)))) > 24)) and B.PRICE_TO_BP>250000 AND B.bid_id=M.bid_id AND B.tracker_id = M.tracker_id   and A.bid_id=M.bid_id and A.tracker_id = M.tracker_id",
// Updated query on Dec 13th Dec
    // conn.query("SELECT DISTINCT B.BID_GEO_CD,COALESCE(B.REGION,B.BID_GEO_CD) AS REGION,B.CUST_CTRY_NAME AS COUNTRY,B.BRAND,B.CFP,A.BID_ID,B.CUST_NAME AS CUSTOMER_NAME,CAST(ROUND((B.PRICE_TO_BP)/1000000,2) AS DECIMAL(19,2)) AS REVENUE,CASE WHEN UPPER(B.BID_FACTOR_LIST) LIKE '%FOCUS BP%' THEN REPLACE(REPLACE(INITCAP(REPLACE(REPLACE(concat(LEFT(B.BID_FACTOR_LIST, LOCATE(':',B.BID_FACTOR_LIST)-1),REPLACE(SUBSTR(B.BID_FACTOR_LIST,varchar(LOCATE(';×',B.BID_FACTOR_LIST)+1), LENGTH(varchar(B.BID_FACTOR_LIST))+1),';×', '×')),'×',', '),'FOCUS BP','Focus BP')),'Confidentiality','NDA'),'Focus Bp','Focus BP')ELSE REPLACE(REPLACE(INITCAP(REPLACE(B.BID_FACTOR_LIST,'×',', ')),'Confidentiality','NDA'),',',', ') END  BID_FACTOR_LIST,B.AGING,M.EXECUTIVE_LOG from BRTRMD.V_RMD_TRACKER_RPT B LEFT OUTER JOIN (select bid_id,max(tracker_id) tracker_id from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) A ON B.bid_id=A.bid_id AND B.tracker_id = A.tracker_id , (select bid_id,cast(LISTAGG(cast(executive_log AS VARCHAR(20000)), ',') as varchar(20000)) as EXECUTIVE_LOG,tracker_id from (select bid_id,case when executive_log IS NOT NULL THEN REPLACE(executive_log,SUBSTR(executive_log,6,5),' ') ELSE executive_log END AS executive_log,tracker_id from(select bid_id,tracker_id,section_id,max(action_id),max(log_date),executive_log from BRTRMD.V_RMD_TRACKER_RPT where (bid_id,tracker_id) in (select bid_id ,max(tracker_id) from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) group by bid_id,tracker_id,section_id,executive_log))C GROUP BY C.BID_ID,tracker_id) M WHERE  (B.STATUS='OPEN' and ((timestampdiff(8,char(CURRENT_TIMESTAMP-timestamp(B.CREATED_DATE)))) > 24)) and B.PRICE_TO_BP>250000 AND B.bid_id=M.bid_id AND B.tracker_id = M.tracker_id   and A.bid_id=M.bid_id and A.tracker_id = M.tracker_id",
    //Updated below query on March 4th 2020
    //  conn.query("SELECT DISTINCT B.BID_GEO_CD,COALESCE(B.REGION,B.BID_GEO_CD) AS REGION,B.CUST_CTRY_NAME AS COUNTRY,B.BRAND,B.CFP,A.BID_ID,B.CUST_NAME AS CUSTOMER_NAME,CAST(ROUND((B.PRICE_TO_BP)/1000000,2) AS DECIMAL(19,2)) AS REVENUE,CASE WHEN UPPER(B.BID_FACTOR_LIST) LIKE '%FOCUS BP%' THEN REPLACE(REPLACE(INITCAP(REPLACE(REPLACE(concat(LEFT(B.BID_FACTOR_LIST, LOCATE(' ',B.BID_FACTOR_LIST)-1),REPLACE(SUBSTR(B.BID_FACTOR_LIST,varchar(LOCATE(';×',B.BID_FACTOR_LIST)+1), LENGTH(varchar(B.BID_FACTOR_LIST))+1),';×', '×')),'×',', '),'FOCUS BP','Focus BP')),'Confidentiality','NDA'),'Focus Bp','Focus BP') ELSE REPLACE(REPLACE(INITCAP(REPLACE(B.BID_FACTOR_LIST,'×',', ')),'Confidentiality','NDA'),',',', ') END  BID_FACTOR_LIST,B.AGING,M.EXECUTIVE_LOG from BRTRMD.V_RMD_TRACKER_RPT B LEFT OUTER JOIN (select bid_id,max(tracker_id) tracker_id from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) A ON B.bid_id=A.bid_id AND B.tracker_id = A.tracker_id , (select bid_id,cast(LISTAGG(cast(executive_log AS VARCHAR(20000)), ',') as varchar(20000)) as EXECUTIVE_LOG,tracker_id from (select bid_id,case when executive_log is not null  and trim(executive_log) like '__/__/%'  then replace(executive_log,substr(trim(executive_log),6,5),' ') when executive_log is not null  and trim(executive_log) like '_/_/%'  then replace(executive_log,substr(trim(executive_log),4,5),' ') when executive_log is not null and trim(executive_log) like '_/__/%' then replace(executive_log,substr(trim(executive_log),5,5),' ') when executive_log IS NOT NULL AND UPPER(EXECUTIVE_LOG) LIKE UPPER('0%') THEN REPLACE(executive_log,SUBSTR(executive_log,6,5),' ') ELSE executive_log END AS executive_log,tracker_id from(select bid_id,tracker_id,section_id,max(action_id),max(log_date),executive_log from BRTRMD.V_RMD_TRACKER_RPT where (bid_id,tracker_id) in (select bid_id ,max(tracker_id) from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) group by bid_id,tracker_id,section_id,executive_log))C GROUP BY C.BID_ID,tracker_id) M WHERE  (B.STATUS='OPEN' and ((timestampdiff(8,char(CURRENT_TIMESTAMP-timestamp(B.CREATED_DATE)))) > 24)) and B.PRICE_TO_BP>250000 AND B.bid_id=M.bid_id AND B.tracker_id = M.tracker_id   and A.bid_id=M.bid_id and A.tracker_id = M.tracker_id",
    //Updated below query on April 20th 2020
    //conn.query("SELECT DISTINCT B.BID_GEO_CD,COALESCE(B.REGION,B.BID_GEO_CD) AS REGION,B.CUST_CTRY_NAME AS COUNTRY,B.BRAND,B.CFP,A.BID_ID,B.CUST_NAME AS CUSTOMER_NAME,CAST(ROUND((B.PRICE_TO_BP)/1000000,2) AS DECIMAL(19,2)) AS REVENUE,CASE WHEN UPPER(B.BID_FACTOR_LIST) LIKE '%FOCUS BP:%' THEN REPLACE(REPLACE(INITCAP(REPLACE(REPLACE(concat(LEFT(B.BID_FACTOR_LIST, LOCATE(':',B.BID_FACTOR_LIST)-1),REPLACE(SUBSTR(B.BID_FACTOR_LIST,varchar(LOCATE(';×',B.BID_FACTOR_LIST)+1), LENGTH(varchar(B.BID_FACTOR_LIST))+1),';×', '×')),'×',', '),'FOCUS BP','Focus BP')),'Confidentiality','NDA'),'Focus Bp','Focus BP') ELSE REPLACE(REPLACE(INITCAP(REPLACE(B.BID_FACTOR_LIST,'×',', ')),'Confidentiality','NDA'),',',', ') END  BID_FACTOR_LIST,B.AGING,M.EXECUTIVE_LOG from BRTRMD.V_RMD_TRACKER_RPT B LEFT OUTER JOIN (select bid_id,max(tracker_id) tracker_id from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) A ON B.bid_id=A.bid_id AND B.tracker_id = A.tracker_id , (select bid_id,cast(LISTAGG(cast(executive_log AS VARCHAR(20000)), ',') as varchar(20000)) as EXECUTIVE_LOG,tracker_id from (select bid_id,case when executive_log is not null  and trim(executive_log) like '__/__/%'  then replace(executive_log,substr(trim(executive_log),6,5),' ') when executive_log is not null  and trim(executive_log) like '_/_/%'  then replace(executive_log,substr(trim(executive_log),4,5),' ') when executive_log is not null and trim(executive_log) like '_/__/%' then replace(executive_log,substr(trim(executive_log),5,5),' ') when executive_log IS NOT NULL AND UPPER(EXECUTIVE_LOG) LIKE UPPER('0%') THEN REPLACE(executive_log,SUBSTR(executive_log,6,5),' ') ELSE executive_log END AS executive_log,tracker_id from(select bid_id,tracker_id,section_id,max(action_id),max(log_date),executive_log from BRTRMD.V_RMD_TRACKER_RPT where (bid_id,tracker_id) in (select bid_id ,max(tracker_id) from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) group by bid_id,tracker_id,section_id,executive_log))C GROUP BY C.BID_ID,tracker_id) M WHERE B.NEXT_MONTH_BID='N' AND (B.STATUS='OPEN' and ((timestampdiff(8,char(CURRENT_TIMESTAMP-timestamp(B.CREATED_DATE)))) > 24)) and B.PRICE_TO_BP>250000 AND B.bid_id=M.bid_id AND B.tracker_id = M.tracker_id   and A.bid_id=M.bid_id and A.tracker_id = M.tracker_id",
    //Updated below query on May 5th 2020
    //conn.query("SELECT DISTINCT B.BID_GEO_CD,COALESCE(B.REGION,B.BID_GEO_CD) AS REGION,B.CUST_CTRY_NAME AS COUNTRY,B.BRAND,B.CFP,A.BID_ID,B.CUST_NAME AS CUSTOMER_NAME,CAST(ROUND((B.PRICE_TO_BP)/1000000,2) AS DECIMAL(19,2)) AS REVENUE,CASE when LOCATE('×',B.BID_FACTOR_LIST)=0 THEN REPLACE(REPLACE(REPLACE(INITCAP(B.BID_FACTOR_LIST),'Confidentiality','NDA'),':',', '),'Focus Bp','Focus BP') WHEN UPPER(B.BID_FACTOR_LIST) LIKE '%FOCUS BP%' THEN REPLACE(REPLACE(INITCAP(REPLACE(REPLACE(concat(LEFT(B.BID_FACTOR_LIST, LOCATE(':',B.BID_FACTOR_LIST)-1),REPLACE(SUBSTR(B.BID_FACTOR_LIST,varchar(LOCATE(';×',B.BID_FACTOR_LIST)+1), LENGTH(varchar(B.BID_FACTOR_LIST))+1),';×', '×')),'×',', '),'FOCUS BP','Focus BP')),'Confidentiality','NDA'),'Focus Bp','Focus BP') ELSE REPLACE(REPLACE(INITCAP(REPLACE(B.BID_FACTOR_LIST,'×',', ')),'Confidentiality','NDA'),',',', ') END BID_FACTOR_LIST,B.AGING,M.EXECUTIVE_LOG from BRTRMD.V_RMD_TRACKER_RPT B LEFT OUTER JOIN (select bid_id,max(tracker_id) tracker_id from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) A ON B.bid_id=A.bid_id AND B.tracker_id = A.tracker_id ,(select bid_id,cast(LISTAGG(cast(executive_log AS VARCHAR(20000)), ',') as varchar(20000)) as EXECUTIVE_LOG,tracker_id from (select bid_id,case when executive_log is not null  and trim(executive_log) like '__/__/%'  then replace(executive_log,substr(trim(executive_log),6,5),' ') when executive_log is not null  and trim(executive_log) like '_/_/%'  then replace(executive_log,substr(trim(executive_log),4,5),' ') when executive_log is not null and trim(executive_log) like '_/__/%' then replace(executive_log,substr(trim(executive_log),5,5),' ') when executive_log IS NOT NULL AND UPPER(EXECUTIVE_LOG) LIKE UPPER('0%') THEN REPLACE(executive_log,SUBSTR(executive_log,6,5),' ') ELSE executive_log END AS executive_log,tracker_id from(select bid_id,tracker_id,section_id,max(action_id),max(log_date),executive_log from BRTRMD.V_RMD_TRACKER_RPT where (bid_id,tracker_id) in (select bid_id ,max(tracker_id) from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) group by bid_id,tracker_id,section_id,executive_log))C GROUP BY C.BID_ID,tracker_id) M WHERE B.NEXT_MONTH_BID='N' AND  (B.STATUS='OPEN' and ((timestampdiff(8,char(CURRENT_TIMESTAMP-timestamp(B.CREATED_DATE)))) > 24)) and B.PRICE_TO_BP>250000 AND B.bid_id=M.bid_id AND B.tracker_id = M.tracker_id   and A.bid_id=M.bid_id and A.tracker_id = M.tracker_id",
    //Updated below query on May 18 2020
    conn.query("SELECT DISTINCT B.BID_GEO_CD,COALESCE(B.REGION,B.BID_GEO_CD) AS REGION,B.CUST_CTRY_NAME AS COUNTRY,B.BRAND,B.CFP,A.BID_ID,B.CUST_NAME AS CUSTOMER_NAME,CAST(ROUND((B.PRICE_TO_BP)/1000000,2) AS DECIMAL(19,2)) AS REVENUE,CASE when LOCATE('×',B.BID_FACTOR_LIST)=0 THEN REPLACE(REPLACE(REPLACE(UPPER(B.BID_FACTOR_LIST),'CONFIDENTIALITY','NDA'),':',', '),'FOCUS BP','Focus BP') WHEN UPPER(B.BID_FACTOR_LIST) LIKE '%FOCUS BP%' THEN REPLACE(REPLACE(UPPER(REPLACE(REPLACE(concat(LEFT(B.BID_FACTOR_LIST, LOCATE(':',B.BID_FACTOR_LIST)-1),REPLACE(SUBSTR(B.BID_FACTOR_LIST,varchar(LOCATE(';×',B.BID_FACTOR_LIST)+1), LENGTH(varchar(B.BID_FACTOR_LIST))+1),';×', '×')),'×',', '),'FOCUS BP','Focus BP')),'CONFIDENTIALITY','NDA'),'FOCUS BP','Focus BP') ELSE REPLACE(REPLACE(UPPER(REPLACE(B.BID_FACTOR_LIST,'×',', ')),'CONFIDENTIALITY','NDA'),',',', ') END BID_FACTOR_LIST,B.AGING,M.EXECUTIVE_LOG from BRTRMD.V_RMD_TRACKER_RPT B LEFT OUTER JOIN (select bid_id,max(tracker_id) tracker_id from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) A ON B.bid_id=A.bid_id AND B.tracker_id = A.tracker_id ,(select bid_id,cast(LISTAGG(cast(executive_log AS VARCHAR(20000)), ',') as varchar(20000)) as EXECUTIVE_LOG,tracker_id from (select bid_id,case when executive_log is not null  and trim(executive_log) like '__/__/%'  then replace(executive_log,substr(trim(executive_log),6,5),' ') when executive_log is not null  and trim(executive_log) like '_/_/%'  then replace(executive_log,substr(trim(executive_log),4,5),' ') when executive_log is not null and trim(executive_log) like '_/__/%' then replace(executive_log,substr(trim(executive_log),5,5),' ') when executive_log IS NOT NULL AND UPPER(EXECUTIVE_LOG) LIKE UPPER('0%') THEN REPLACE(executive_log,SUBSTR(executive_log,6,5),' ') ELSE executive_log END AS executive_log,tracker_id from(select bid_id,tracker_id,section_id,max(action_id),max(log_date),executive_log from BRTRMD.V_RMD_TRACKER_RPT where (bid_id,tracker_id) in (select bid_id ,max(tracker_id) from BRTRMD.V_RMD_TRACKER_RPT group by bid_id) group by bid_id,tracker_id,section_id,executive_log))C GROUP BY C.BID_ID,tracker_id) M WHERE B.NEXT_MONTH_BID='N' AND  (B.STATUS='OPEN' and ((timestampdiff(8,char(CURRENT_TIMESTAMP-timestamp(B.CREATED_DATE)))) > 24)) and B.PRICE_TO_BP>250000 AND B.bid_id=M.bid_id AND B.tracker_id = M.tracker_id   and A.bid_id=M.bid_id and A.tracker_id = M.tracker_id",
    
      function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err);
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
})


// Return Reject
router.get("/returnreject", function (request, response) {
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
        // conn.query("SELECT DISTINCT OUTCOME AS OUTCOME,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,BID_ID,TRACKER_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CFP,CUST_NAME AS CUSTOMER_NAME,FINAL_LOG_MSG as FINAL_COMMENT,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE from BRTRMD.V_RMD_TRACKER_RPT WHERE OUTCOME in ('RETURNED','REJECTED');",  
      //updated query on 13th Dec
      //conn.query("SELECT DISTINCT OUTCOME AS OUTCOME,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,BID_ID,TRACKER_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CFP,CUST_NAME AS CUSTOMER_NAME,FINAL_LOG_MSG as FINAL_COMMENT,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE,cast(COMMENTS as varchar(1000)) as COMMENTS from BRTRMD.V_RMD_TRACKER_RPT WHERE OUTCOME in ('RETURNED','REJECTED');",
      conn.query("SELECT DISTINCT OUTCOME AS OUTCOME,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,BID_ID,TRACKER_ID,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,CFP,CUST_NAME AS CUSTOMER_NAME,FINAL_LOG_MSG as FINAL_COMMENT,CAST(ROUND(PRICE_TO_BP,2) as DECIMAL(31,2)) AS REVENUE,cast(COMMENTS as varchar(10000)) as COMMENTS from BRTRMD.V_RMD_TRACKER_RPT WHERE OUTCOME in ('RETURNED','REJECTED')",
      function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err);
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
})


// Post Ship Eligibel Report
router.get("/postshipeligible", function (request, response) {
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
        // conn.query("SELECT QUARTER,OUTCOME AS OUTCOME,BID_ID,TRACKER_ID,TO_CHAR(BID_DATE, 'YYYY-MM-DD HH24:MI:SS' ) as BID_DATE,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,BRAND,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG from BRTRMD.V_RMD_TRACKER_RPT WHERE POST_SHIP_ELIGIBLE='Y';",
        //updated query on 20thNov
        // conn.query("SELECT DISTINCT QUARTER,OUTCOME AS OUTCOME,BID_ID,TRACKER_ID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,BRAND,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG from BRTRMD.V_RMD_TRACKER_RPT WHERE POST_SHIP_ELIGIBLE='Y';",
        //updated query on Aug 21 2020
        conn.query("SELECT DISTINCT QUARTER, OUTCOME AS OUTCOME, BID_ID, TRACKER_ID, TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE, BID_GEO_CD, REGION, CUST_CTRY_NAME AS COUNTRY, BRAND, PSV_AUTO as AUTO_PSV, CUST_NAME AS CUSTOMER_NAME, TIER1_NAME AS DISTRIBUTOR_NAME, CFP, CONSOLIDATED_LOG AS LOG from BRTRMD.V_RMD_TRACKER_RPT WHERE POST_SHIP_ELIGIBLE='Y';",
        function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err);
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
})

// Post Ship Selected Report
router.get("/postshipselected", function (request, response) {
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
        // conn.query("SELECT QUARTER,OUTCOME AS OUTCOME,BID_ID,TRACKER_ID,TO_CHAR(BID_DATE, 'YYYY-MM-DD HH24:MI:SS' ) as BID_DATE,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,BRAND,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG from BRTRMD.V_RMD_TRACKER_RPT WHERE POST_SHIP_SELECTED='Y';",
        //updated query on 20thNov
        // conn.query("SELECT DISTINCT QUARTER,OUTCOME AS OUTCOME,BID_ID,TRACKER_ID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,BID_GEO_CD,REGION,CUST_CTRY_NAME AS COUNTRY,BRAND,CUST_NAME AS CUSTOMER_NAME,TIER1_NAME AS DISTRIBUTOR_NAME,CFP,CONSOLIDATED_LOG AS LOG from BRTRMD.V_RMD_TRACKER_RPT WHERE POST_SHIP_SELECTED='Y';",
        //updated query on Aug 21 2020
        conn.query("SELECT DISTINCT QUARTER, OUTCOME AS OUTCOME, BID_ID, TRACKER_ID, TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE, BID_GEO_CD, REGION, CUST_CTRY_NAME AS COUNTRY, BRAND, PSV_AUTO as AUTO_PSV, CUST_NAME AS CUSTOMER_NAME, TIER1_NAME AS DISTRIBUTOR_NAME, CFP, CONSOLIDATED_LOG AS LOG from BRTRMD.V_RMD_TRACKER_RPT WHERE POST_SHIP_SELECTED='Y';",
        function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err);
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
})

// Adhoc Report
router.get("/adhoc", function (request, response) {
  ibmdb.open(settings.connectionString,function (error, conn) {
      if (error) {
        console.log("BRET DB2 connection ERROR!!! ", error.message);
        ibmdb.close(conn); // close the DB2 connection after it is used
        response.json(error);
      } else {
        console.log("BRET DB2 is successfully connected!!!");
     // conn.query("SELECT BID_GEO_CD,SOURCE_SYS_CD,BID_ID,ADDITIONAL_ID,TRACKER_ID,OCPS_ID,BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,DISTRIBUTOR_NAME,DISTRIBUTOR_ID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUSTOMER_NAME,CUSTOMER_ID,BP_MARGIN,DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,REVENUE,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,ACTION_LOG,ACTION_OWNER,REMEDIATION_CLOSED,REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,(cast(to_char(current_TIMESTAMP,'J') as INT)-cast(to_char(BID_DATE,'J')as INT)) AS DaysInBret,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG FROM (SELECT BID_GEO_CD,SOURCE_SYS_CD,BID_ID, cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID,TRACKER_ID,OCPS_ID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,TIER1_NAME AS DISTRIBUTOR_NAME,TIER1_CEID AS DISTRIBUTOR_ID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUST_NAME AS CUSTOMER_NAME,CUSTOMER_ID,CAST(ROUND(BP_MARGIN,2) as DECIMAL(31,2)) AS BP_MARGIN,CAST(ROUND(DISCOUNT,2) as DECIMAL(31,2)) AS DISCOUNT,CAST(ROUND(BP_MARGIN_AMT,2) as DECIMAL(31,2)) AS BP_MARGIN_AMT,BRET_SCORE,CAST(ROUND(PRICE_TO_BP/1000,2) as DECIMAL(31,2)) AS REVENUE,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO, cast(LISTAGG(cast(ACTION_LOG AS VARCHAR(20000)), ', ') as varchar(20000)) as ACTION_LOG,ACTION_OWNER,REMEDIATION_CLOSED,TO_CHAR(REMEDIATION_CLOSED_DATE, 'YYYY-MM-DD' ) as REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,CAST(ROUND(BPM_T1_FIN,2) as DECIMAL(31,2)) AS BPM_T1_FIN,CAST(ROUND(BPM_T1_FIN_SERV,2) as DECIMAL(31,2)) AS BPM_T1_FIN_SERV,CAST(ROUND(BPM_T1_INS_FREIGHT,2) as DECIMAL(31,2)) AS BPM_T1_INS_FREIGHT,CAST(ROUND(BPM_T1_PROFIT,2) as DECIMAL(31,2)) AS BPM_T1_PROFIT,CAST(ROUND(BPM_T2_FIN,2) as DECIMAL(31,2)) AS BPM_T2_FIN,CAST(ROUND(BPM_T2_SERV,2) as DECIMAL(31,2)) AS BPM_T2_SERV,CAST(ROUND(BPM_OTHER,2) as DECIMAL(31,2)) AS BPM_OTHER,CAST(ROUND(END_USER_PRICE,2) as DECIMAL(31,2)) AS END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TO_CHAR(TRANSPARENCY_LETTER_DATE, 'YYYY-MM-DD' ) as TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,TO_CHAR(PRE_SHIP_CLOSE_DATE, 'YYYY-MM-DD' ) as PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,TO_CHAR(POST_SHIP_CLOSE_DATE, 'YYYY-MM-DD' ) as POST_SHIP_CLOSE_DATE,CAST(ROUND(POST_SHIP_RECOVERY_AMOUNT,2) as DECIMAL(31,2)) AS POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG from BRTRMD.V_RMD_TRACKER_RPT group by BID_GEO_CD,SOURCE_SYS_CD,BID_ID, cast(SAP_QUOTE_NUM as varchar(1000)),TRACKER_ID,OCPS_ID,BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,TIER1_NAME,TIER1_CEID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUST_NAME,CUSTOMER_ID,BP_MARGIN,DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,PRICE_TO_BP,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,ACTION_OWNER,REMEDIATION_CLOSED,REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG)A;",
     //updated query on 13thDec
      // conn.query("SELECT BID_GEO_CD,SOURCE_SYS_CD,BID_ID,ADDITIONAL_ID,TRACKER_ID,OCPS_ID,BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,DISTRIBUTOR_NAME,DISTRIBUTOR_ID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUSTOMER_NAME,CUSTOMER_ID,BP_MARGIN,DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,REVENUE,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,ACTION_LOG,ACTION_OWNER,REMEDIATION_CLOSED,REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,(cast(to_char(current_TIMESTAMP,'J') as INT)-cast(to_char(BID_DATE,'J')as INT)) AS DaysInBret,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,COMMENTS FROM (SELECT BID_GEO_CD,SOURCE_SYS_CD,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID,TRACKER_ID,OCPS_ID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,TIER1_NAME AS DISTRIBUTOR_NAME,TIER1_CEID AS DISTRIBUTOR_ID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUST_NAME AS CUSTOMER_NAME,CUSTOMER_ID,CAST(ROUND(BP_MARGIN,2) as DECIMAL(31,2)) AS BP_MARGIN,CAST(ROUND(DISCOUNT,2) as DECIMAL(31,2)) AS DISCOUNT,CAST(ROUND(BP_MARGIN_AMT,2) as DECIMAL(31,2)) AS BP_MARGIN_AMT,BRET_SCORE,CAST(ROUND(PRICE_TO_BP/1000,2) as DECIMAL(31,2)) AS REVENUE,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,cast(LISTAGG(cast(ACTION_LOG AS VARCHAR(20000)), ', ') as varchar(20000)) as ACTION_LOG,ACTION_OWNER,REMEDIATION_CLOSED,TO_CHAR(REMEDIATION_CLOSED_DATE, 'YYYY-MM-DD' ) as REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,CAST(ROUND(BPM_T1_FIN,2) as DECIMAL(31,2)) AS BPM_T1_FIN,CAST(ROUND(BPM_T1_FIN_SERV,2) as DECIMAL(31,2)) AS BPM_T1_FIN_SERV,CAST(ROUND(BPM_T1_INS_FREIGHT,2) as DECIMAL(31,2)) AS BPM_T1_INS_FREIGHT,CAST(ROUND(BPM_T1_PROFIT,2) as DECIMAL(31,2)) AS BPM_T1_PROFIT,CAST(ROUND(BPM_T2_FIN,2) as DECIMAL(31,2)) AS BPM_T2_FIN,CAST(ROUND(BPM_T2_SERV,2) as DECIMAL(31,2)) AS BPM_T2_SERV,CAST(ROUND(BPM_OTHER,2) as DECIMAL(31,2)) AS BPM_OTHER,CAST(ROUND(END_USER_PRICE,2) as DECIMAL(31,2)) AS END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TO_CHAR(TRANSPARENCY_LETTER_DATE, 'YYYY-MM-DD' ) as TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,TO_CHAR(PRE_SHIP_CLOSE_DATE, 'YYYY-MM-DD' ) as PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,TO_CHAR(POST_SHIP_CLOSE_DATE, 'YYYY-MM-DD' ) as POST_SHIP_CLOSE_DATE,CAST(ROUND(POST_SHIP_RECOVERY_AMOUNT,2) as DECIMAL(31,2)) AS POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,cast(COMMENTS as varchar(1000)) AS COMMENTS from BRTRMD.V_RMD_TRACKER_RPT group by BID_GEO_CD,SOURCE_SYS_CD,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)),TRACKER_ID,OCPS_ID,BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,TIER1_NAME,TIER1_CEID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUST_NAME,CUSTOMER_ID,BP_MARGIN,DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,PRICE_TO_BP,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,ACTION_OWNER,REMEDIATION_CLOSED,REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,cast(COMMENTS as varchar(1000)))A;",
      //conn.query("SELECT BID_GEO_CD,SOURCE_SYS_CD,BID_ID,ADDITIONAL_ID,TRACKER_ID,OCPS_ID,BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,DISTRIBUTOR_NAME,DISTRIBUTOR_ID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUSTOMER_NAME,CUSTOMER_ID,BP_MARGIN,DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,REVENUE,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,ACTION_LOG,ACTION_OWNER,REMEDIATION_CLOSED,REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,(cast(to_char(current_TIMESTAMP,'J') as INT)-cast(to_char(BID_DATE,'J')as INT)) AS DaysInBret,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,TENDER_STAGE,COMMENTS FROM (SELECT BID_GEO_CD,SOURCE_SYS_CD,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID,TRACKER_ID,OCPS_ID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,TIER1_NAME AS DISTRIBUTOR_NAME,TIER1_CEID AS DISTRIBUTOR_ID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUST_NAME AS CUSTOMER_NAME,CUSTOMER_ID,CAST(ROUND(BP_MARGIN,2) as DECIMAL(31,2)) AS BP_MARGIN,CAST(ROUND(DISCOUNT,2) as DECIMAL(31,2)) AS DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,CAST(ROUND(PRICE_TO_BP/1000,2) as DECIMAL(31,2)) AS REVENUE,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,cast(LISTAGG(cast(ACTION_LOG AS VARCHAR(20000)), ', ') as varchar(20000)) as ACTION_LOG,ACTION_OWNER,REMEDIATION_CLOSED,TO_CHAR(REMEDIATION_CLOSED_DATE, 'YYYY-MM-DD' ) as REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TO_CHAR(TRANSPARENCY_LETTER_DATE, 'YYYY-MM-DD' ) as TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,TO_CHAR(PRE_SHIP_CLOSE_DATE, 'YYYY-MM-DD' ) as PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,TO_CHAR(POST_SHIP_CLOSE_DATE, 'YYYY-MM-DD' ) as POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,TENDER_STAGE,cast(COMMENTS as varchar(10000)) AS COMMENTS from BRTRMD.V_RMD_TRACKER_RPT group by BID_GEO_CD,SOURCE_SYS_CD,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)),TRACKER_ID,OCPS_ID,BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,TIER1_NAME,TIER1_CEID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUST_NAME,CUSTOMER_ID,BP_MARGIN,DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,PRICE_TO_BP,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,ACTION_OWNER,REMEDIATION_CLOSED,REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,TENDER_STAGE,cast(COMMENTS as varchar(10000)))A;",
      // conn.query("SELECT BID_GEO_CD,SOURCE_SYS_CD,BID_ID,ADDITIONAL_ID,TRACKER_ID,OCPS_ID,BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,DISTRIBUTOR_NAME,DISTRIBUTOR_ID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUSTOMER_NAME,CUSTOMER_ID,BP_MARGIN,DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,REVENUE,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,ACTION_LOG,ACTION_OWNER,REMEDIATION_CLOSED,REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,CASE WHEN (REMEDIATION_CLOSED_DATE IS NOT NULL) THEN  (cast(to_char(REMEDIATION_CLOSED_DATE,'J') as INT)-cast(to_char(BID_DATE,'J')as INT)) END AS DaysInBret,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,TENDER_STAGE,COMMENTS FROM (SELECT BID_GEO_CD,SOURCE_SYS_CD,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID,TRACKER_ID,OCPS_ID,TO_CHAR(BID_DATE, 'YYYY-MM-DD' ) as BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,TIER1_NAME AS DISTRIBUTOR_NAME,TIER1_CEID AS DISTRIBUTOR_ID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUST_NAME AS CUSTOMER_NAME,CUSTOMER_ID,CAST(ROUND(BP_MARGIN,2) as DECIMAL(31,2)) AS BP_MARGIN,CAST(ROUND(DISCOUNT,2) as DECIMAL(31,2)) AS DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,CAST(ROUND(PRICE_TO_BP/1000,2) as DECIMAL(31,2)) AS REVENUE,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,cast(LISTAGG(cast(ACTION_LOG AS VARCHAR(20000)), ', ') as varchar(20000)) as ACTION_LOG,ACTION_OWNER,REMEDIATION_CLOSED,TO_CHAR(REMEDIATION_CLOSED_DATE, 'YYYY-MM-DD' ) as REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TO_CHAR(TRANSPARENCY_LETTER_DATE, 'YYYY-MM-DD' ) as TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,TO_CHAR(PRE_SHIP_CLOSE_DATE, 'YYYY-MM-DD' ) as PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,TO_CHAR(POST_SHIP_CLOSE_DATE, 'YYYY-MM-DD' ) as POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,TENDER_STAGE,cast(COMMENTS as varchar(10000)) AS COMMENTS from BRTRMD.V_RMD_TRACKER_RPT group by BID_GEO_CD,SOURCE_SYS_CD,BID_ID,cast(SAP_QUOTE_NUM as varchar(1000)),TRACKER_ID,OCPS_ID,BID_DATE,CUST_CTRY_NAME,REGION,BRAND,OUTCOME,TIER1_NAME,TIER1_CEID,TIER2_NAME ,TIER2_CEID,T3_NAME,T4_NAME,CUST_NAME,CUSTOMER_ID,BP_MARGIN,DISCOUNT,BP_MARGIN_AMT,BRET_SCORE,PRICE_TO_BP,CONF_NDA,NON_STD_RTM,NON_STD_PAYMENT,BUNDLE,CONTINGENCY_FEE,FOCUS_BP,SOLE_SOURCE_NON_COMPETITIVE,MARGIN_OUTLIER_PERCENT,DISCOUNT_OUTLIER,MARGIN_OUTLIER_DOLLAR,SUP_FACTORS,TOTAL_BID_SCORE,ASSIGNED_TO,ACTION_OWNER,REMEDIATION_CLOSED,REMEDIATION_CLOSED_DATE,FOLLOWUP_ACTION,CREATED_DATE,PRICE_REQUEST,SYSTEM_INTEGRATOR_BID,BID_FACTOR_LIST,OO,OO_MANAGER,OO_MOBILE,BID_MANAGER,BPM_T1_FIN,BPM_T1_FIN_SERV,BPM_T1_INS_FREIGHT,BPM_T1_PROFIT,BPM_T2_FIN,BPM_T2_SERV,BPM_OTHER,END_USER_PRICE,NO_OF_TIERS,PROVIDE_TRANSPARENCY_LETTER,TRANSPARENCY_LETTER_SENT,TRANSPARENCY_LETTER_DATE,PROVIDE_PRE_SHIP,PRE_SHIP_STS_RESULT,PRE_SHIP_COC_ACTION,PRE_SHIP_CLOSE_DATE,PRE_SHIP_COMMENTS,POST_SHIP_ELIGIBLE,POST_SHIP_SELECTED,AUDIT_FOLLOWUP_STATUS,AUDIT_RESULTS,PSV_REQUIRED,POST_SHIP_CLOSE_DATE,POST_SHIP_RECOVERY_AMOUNT,POST_SHIP_COMMENTS,FINAL_LOG_MSG,TENDER_STAGE,cast(COMMENTS as varchar(10000)))A;",
      //updated query on Aug 21 2020
      conn.query("SELECT BID_GEO_CD, SOURCE_SYS_CD, BID_ID, ADDITIONAL_ID, TRACKER_ID, OCPS_ID, BID_DATE, CUST_CTRY_NAME, REGION, BRAND, OUTCOME, DISTRIBUTOR_NAME, DISTRIBUTOR_ID, TIER2_NAME , TIER2_CEID, T3_NAME, T4_NAME, CUSTOMER_NAME, CUSTOMER_ID, BP_MARGIN, DISCOUNT, BP_MARGIN_AMT, BRET_SCORE, REVENUE, CONF_NDA, NON_STD_RTM, NON_STD_PAYMENT, BUNDLE, CONTINGENCY_FEE, FOCUS_BP, SOLE_SOURCE_NON_COMPETITIVE, MARGIN_OUTLIER_PERCENT, DISCOUNT_OUTLIER, MARGIN_OUTLIER_DOLLAR, SUP_FACTORS, TOTAL_BID_SCORE, ASSIGNED_TO, ACTION_LOG, ACTION_OWNER, REMEDIATION_CLOSED, REMEDIATION_CLOSED_DATE, FOLLOWUP_ACTION, AUTO_PSV, CREATED_DATE, PRICE_REQUEST, SYSTEM_INTEGRATOR_BID, BID_FACTOR_LIST, OO, OO_MANAGER, OO_MOBILE, BID_MANAGER, CASE WHEN (REMEDIATION_CLOSED_DATE IS NOT NULL) THEN  (cast(to_char(REMEDIATION_CLOSED_DATE,'J') as INT)-cast(to_char(BID_DATE,'J')as INT)) END AS DaysInBret, BPM_T1_FIN, BPM_T1_FIN_SERV, BPM_T1_INS_FREIGHT, BPM_T1_PROFIT, BPM_T2_FIN, BPM_T2_SERV, BPM_OTHER, END_USER_PRICE, NO_OF_TIERS, PROVIDE_TRANSPARENCY_LETTER, TRANSPARENCY_LETTER_SENT, TRANSPARENCY_LETTER_DATE, PROVIDE_PRE_SHIP, PRE_SHIP_STS_RESULT, PRE_SHIP_COC_ACTION, PRE_SHIP_CLOSE_DATE, PRE_SHIP_COMMENTS, POST_SHIP_ELIGIBLE, POST_SHIP_SELECTED, AUDIT_FOLLOWUP_STATUS, AUDIT_RESULTS, PSV_REQUIRED, POST_SHIP_CLOSE_DATE, POST_SHIP_RECOVERY_AMOUNT, POST_SHIP_COMMENTS, FINAL_LOG_MSG, TENDER_STAGE, COMMENTS FROM (SELECT BID_GEO_CD, SOURCE_SYS_CD, BID_ID, cast(SAP_QUOTE_NUM as varchar(1000)) AS ADDITIONAL_ID, TRACKER_ID, OCPS_ID, TO_CHAR(BID_DATE,  'YYYY-MM-DD' ) as BID_DATE, CUST_CTRY_NAME, REGION, BRAND, OUTCOME, TIER1_NAME AS DISTRIBUTOR_NAME, TIER1_CEID AS DISTRIBUTOR_ID, TIER2_NAME , TIER2_CEID, T3_NAME, T4_NAME, CUST_NAME AS CUSTOMER_NAME, CUSTOMER_ID, CAST(ROUND(BP_MARGIN, 2) as DECIMAL(31, 2)) AS BP_MARGIN, CAST(ROUND(DISCOUNT, 2) as DECIMAL(31, 2)) AS DISCOUNT, BP_MARGIN_AMT, BRET_SCORE, CAST(ROUND(PRICE_TO_BP/1000, 2) as DECIMAL(31, 2)) AS REVENUE, CONF_NDA, NON_STD_RTM, NON_STD_PAYMENT, BUNDLE, CONTINGENCY_FEE, FOCUS_BP, SOLE_SOURCE_NON_COMPETITIVE, MARGIN_OUTLIER_PERCENT, DISCOUNT_OUTLIER, MARGIN_OUTLIER_DOLLAR, SUP_FACTORS, TOTAL_BID_SCORE, ASSIGNED_TO, cast(LISTAGG(cast(ACTION_LOG AS VARCHAR(20000)), ', ') as varchar(20000)) as ACTION_LOG, ACTION_OWNER, REMEDIATION_CLOSED, TO_CHAR(REMEDIATION_CLOSED_DATE,  'YYYY-MM-DD' ) as REMEDIATION_CLOSED_DATE, FOLLOWUP_ACTION, PSV_AUTO AS AUTO_PSV, CREATED_DATE, PRICE_REQUEST, SYSTEM_INTEGRATOR_BID, BID_FACTOR_LIST, OO, OO_MANAGER, OO_MOBILE, BID_MANAGER, BPM_T1_FIN, BPM_T1_FIN_SERV, BPM_T1_INS_FREIGHT, BPM_T1_PROFIT, BPM_T2_FIN, BPM_T2_SERV, BPM_OTHER, END_USER_PRICE, NO_OF_TIERS, PROVIDE_TRANSPARENCY_LETTER, TRANSPARENCY_LETTER_SENT, TO_CHAR(TRANSPARENCY_LETTER_DATE,  'YYYY-MM-DD' ) as TRANSPARENCY_LETTER_DATE, PROVIDE_PRE_SHIP, PRE_SHIP_STS_RESULT, PRE_SHIP_COC_ACTION, TO_CHAR(PRE_SHIP_CLOSE_DATE,  'YYYY-MM-DD' ) as PRE_SHIP_CLOSE_DATE, PRE_SHIP_COMMENTS, POST_SHIP_ELIGIBLE, POST_SHIP_SELECTED, AUDIT_FOLLOWUP_STATUS, AUDIT_RESULTS, PSV_REQUIRED, TO_CHAR(POST_SHIP_CLOSE_DATE,  'YYYY-MM-DD' ) as POST_SHIP_CLOSE_DATE, POST_SHIP_RECOVERY_AMOUNT, POST_SHIP_COMMENTS, FINAL_LOG_MSG, TENDER_STAGE, cast(COMMENTS as varchar(10000)) AS COMMENTS from BRTRMD.V_RMD_TRACKER_RPT group by BID_GEO_CD, SOURCE_SYS_CD, BID_ID, cast(SAP_QUOTE_NUM as varchar(1000)),TRACKER_ID, OCPS_ID, BID_DATE, CUST_CTRY_NAME, REGION, BRAND, OUTCOME, TIER1_NAME, TIER1_CEID, TIER2_NAME , TIER2_CEID, T3_NAME, T4_NAME, CUST_NAME, CUSTOMER_ID, BP_MARGIN, DISCOUNT, BP_MARGIN_AMT, BRET_SCORE, PRICE_TO_BP, CONF_NDA, NON_STD_RTM, NON_STD_PAYMENT, BUNDLE, CONTINGENCY_FEE, FOCUS_BP, SOLE_SOURCE_NON_COMPETITIVE, MARGIN_OUTLIER_PERCENT, DISCOUNT_OUTLIER, MARGIN_OUTLIER_DOLLAR, SUP_FACTORS, TOTAL_BID_SCORE, ASSIGNED_TO, ACTION_OWNER, REMEDIATION_CLOSED, REMEDIATION_CLOSED_DATE, FOLLOWUP_ACTION, PSV_AUTO, CREATED_DATE, PRICE_REQUEST, SYSTEM_INTEGRATOR_BID, BID_FACTOR_LIST, OO, OO_MANAGER, OO_MOBILE, BID_MANAGER, BPM_T1_FIN, BPM_T1_FIN_SERV, BPM_T1_INS_FREIGHT, BPM_T1_PROFIT, BPM_T2_FIN, BPM_T2_SERV, BPM_OTHER, END_USER_PRICE, NO_OF_TIERS, PROVIDE_TRANSPARENCY_LETTER, TRANSPARENCY_LETTER_SENT, TRANSPARENCY_LETTER_DATE, PROVIDE_PRE_SHIP, PRE_SHIP_STS_RESULT, PRE_SHIP_COC_ACTION, PRE_SHIP_CLOSE_DATE, PRE_SHIP_COMMENTS, POST_SHIP_ELIGIBLE, POST_SHIP_SELECTED, AUDIT_FOLLOWUP_STATUS, AUDIT_RESULTS, PSV_REQUIRED, POST_SHIP_CLOSE_DATE, POST_SHIP_RECOVERY_AMOUNT, POST_SHIP_COMMENTS, FINAL_LOG_MSG, TENDER_STAGE, cast(COMMENTS as varchar(10000)))A;",

      function (err, results, moreResultSets) {
            if (err) {
              console.log("Error in the BRET query results!!! " + err);
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(err);
            } else {
              let data = results;
              ibmdb.close(conn); // close the DB2 connection after it is used
              response.json(data);
            }
          }
        )
      }
    }
  )
}) 

module.exports = router;
