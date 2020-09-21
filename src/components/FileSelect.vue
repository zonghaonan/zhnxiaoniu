<template>
  <label class="file-select">
    <div class="select-button">
    <img src="../assets/img/chat/tuceng.png" alt />
    </div>
    <input type="file" @change="handleFileChange" accept="image/*"/>
  </label>
</template>
<style scoped>
/* .file-select > .select-button {
  float:left;
  margin:5px;
  font-size: 1cm;
  color: white;
  background-color: #2EA169;


    width:60px;
    height: 60px;
  text-align: center;
  font-weight: bold;
} */

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
      display: none;
}
</style>

<script>
export default {
  props: {
    // 这里接受一个 value 因为 v-model 会给组件传递一个 value 属性
    value: File,
  },

  methods: {
    handleFileChange(e) {
      // 同样触发一个 input 来配合 v-model 的使用
      // this.$emit('input', e.target.files[0])
      this.$emit('input1')
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      var self = this;
      this.$http.post('api3/filesystem/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: function (e) {
            // console.log(e);
            if (e.lengthComputable) {
                var rate =  e.loaded / e.total;  //已上传的比例
                console.log(rate);
                if (rate < 1) {
                    var progress =parseInt(rate *100);
                    self.$emit('getRate', progress);
                    console.log(progress);
                }
            }
        }
      }).then(res => {
        console.log(res);
        //if(res.data.statustext=='ok')
        {
          console.log('ok')
          var dict = res.data.message;
          this.$emit('srcChild', dict)
        }
      }).catch(err => {
        console.log(err);
      });

      console.log(e.target.files[0])
    }
  }
}
</script>