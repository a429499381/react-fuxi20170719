/**
 * Created by xutao on 2017/9/4.
 */



export const DB = {
   openDB : function (myDB) {

     return new Promise(function (reslove, reject) {
         let res = window.indexedDB.open(myDB.name, myDB.version)
         res.onerror = function (e) {
             console.log(myDB.ojstore.name, 'Open Error')
         }
         res.onsuccess = function (e) {
             let Versions = myDB.db.version + 1
             myDB.db = e.target.result
             // 打印当前版本号
             console.log('当前版本号', myDB.db.version, myDB.ojstore.name, 'Sucess')
             return reslove(myDB.db)
         }
         res.onupgradeneeded = function (e) {
             myDB.db =e.target.result;

             let tr = e.target.transaction, store

             if (!myDB.db.objectStoreNames.contains(myDB.ojstore.name)){
                 store = myDB.db.createObjectStore(myDB.ojstore.name,{keyPath:myDB.ojstore.keypath});
             }
             console.log(myDB.ojstore.name, "DB version changed to "+ myDB.version);
         }
     })

   },
   closeDB: function(db) {
     return new Promise(function (reslove, reject) {
       db.close()
       console.log(db, '数据库已关闭')
       setTimeout(function () {
         return reslove('ok')
       },0)
     })

   },
   delDB: function (dbname) {
     indexedDB.deleteDatabase(dbname)
   },
   addData: function(db,storeName,data) {
     return new Promise(function (reslove, reject) {
       var transaction=db.transaction(storeName,'readwrite');
       var store=transaction.objectStore(storeName);

       for (var i=0;i<data.length;i++){
         store.add(data[i]);
         store.onsuccess =function () {
           console.log('Ok', data[i])
           if (i === data.length) {
             return reslove(db)
           }
         }
         store.onerror = function () {
           console.log('Error', data[i])
         }
       }
     })

   },
   getDataByKey:function(db,storename,key){
     new Promise(function (reslove, reject) {
       //根据存储空间的键找到对应数据
       var store = db.transaction(storename,'readwrite').objectStore(storename);
       var request = store.get(key);
       request.onerror = function(){
         console.error('getDataByKey error');
       };
       request.onsuccess = function(e){
         var result = e.target.result;
         console.log('查找数据成功')
         console.log(result);
         return setTimeout(function () {
           return reslove(request)
         },0)
       };
     })

  },
   putData:function(db,storename,data){
      return new Promise(function (reslove, reject) {
        //添加数据，重复添加会更新原有数据
        var store = store = db.transaction(storename,'readwrite').objectStore(storename),request;
        for(var i = 0 ; i < data.length;i++){
          request = store.put(data[i]);
          request.onerror = function(){
            console.error(storename,'put添加数据库中已有该数据')
          };
          request.onsuccess = function(){
            console.log(storename, 'put添加数据已存入数据库')
            if (i === data.length) {
              return  setTimeout(function () {
                return reslove(db)
              },100)
            }
          };
        }
      })

  },
   searchData:function(db,storename) {
     return new Promise(function (reslove, reject) {
       let store = store = db.transaction(storename,'readwrite').objectStore(storename),request;
       // let range = IDBKeyRange.lowerBound(1);
       let data = []
       request = store.openCursor()
       request.onsuccess = function (e) {
         let cursor = e.target.result
         if (cursor) {
           // 搜索到的内容保存到 data数据中
           data.push(cursor.value)
           // 下一个  如果没有 返回 undefine
           cursor.continue()
         } else {
           console.log('查询结束')
           DB.closeDB(db)
           return setTimeout(function () {
             reslove(data)
           },0)
         }
       }
     })

   }
}


