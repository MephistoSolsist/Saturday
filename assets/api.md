### 成员（Member）

#### 获取指定成员

```
GET /members/{member_id}
```

##### 参数

| 名称      | 类型    | in   | 描述 |
| --------- | ------- | ---- | ---- |
| member_id | integer | path |      |

##### 示例

###### Example

```
GET /member/2333333333
```

###### Response

```
{
  "member_id": "2333333333",
  "alias": "233",
  "name": "滑稽",
  "section": "计算机233",
  "profile": null,
  "phone": null,
  "qq": null,
  "avatar": null,
  "role": "member",
  "status": "active",
  "created_by": "",
  "gmt_create": "2022-04-14T16:05:42.000Z",
  "gmt_modified": "2022-04-14T16:05:42.000Z",
  "gmt_expire": null
}
```

##### Status codes

| HTTP Status Code | 描述      |
| ---------------- | --------- |
| **200**          | OK        |
| 404              | NOT FOUND |



#### 创建成员

```
POST /members/{member_id}
```

##### 参数

| 名称           | 类型                | in     | 描述 |
| -------------- | ------------------- | ------ | ---- |
| Authorizeation | string              | header |      |
| member_id      | integer             | path   | 学号 |
| name           | string              | body   | 姓名 |
| section        | string（计算机233） | body   | 班级 |

##### 示例

###### Example

```
POST /members/1234567890
```

```
{	
}

```



###### Response

```
```



##### Status codes

| HTTP Status Code | 描述      |
| ---------------- | --------- |
| **200**          | OK        |
| 404              | NOT FOUND |



