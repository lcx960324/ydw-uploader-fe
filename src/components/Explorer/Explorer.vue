<template>
  <div class="explorer">
    <div class="control-panel">
      <div class="control-panel-button">
        <ButtonGroup>
          <Button icon="arrow-return-left" :disabled="$route.query.path === '/'" @click="back">后退</Button>
          <Button icon="folder" @click="create">新建文件夹</Button>
          <Button icon="upload" @click="upload">上传文件</Button>
        </ButtonGroup>
      </div>
      <div class="control-panel-input">
        <Input v-model="filter" placeholder="搜索文件..."></Input>
      </div>
    </div>
    <div class="file-list">
      <div class="file-list-head"></div>
      <div class="file-list-content">
        <Table
          :columns="cols"
          :data="fileList"
          :show-header="false"
          border
          stripe
          disabled-hover
        >
        </Table>
      </div>
      <div class="file-list-bottom"></div>
    </div>
    <Modal
      v-model="uploader"
      title="上传文件"
      class="uploader-modal">
      <span slot="footer"></span>
      <Uploader
      @uploading="closeUploader"
      @uploaded="handleUpload"></Uploader>
    </Modal>
    <Modal
      v-model="creator"
      title="新建文件夹"
      class="creator-modal"
      @on-cacel="cleanFolderName"
      @on-ok="createFolder">
      <Input v-model="folderName"></Input>
    </Modal>
  </div>
</template>

<script>
import Uploader from '@/components/Explorer/Uploader'
import { getFileList, createDir, deleteFile } from '@/APIs/explorer'
export default {
  components: { Uploader },
  data () {
    return {
      uploader: false,
      creator: false,
      folderName: '',
      filter: '',
      cols: [
        {
          key: 'type',
          width: 50,
          align: 'center',
          render (h, { row }) {
            if (row.type === 'file') {
              return h('Icon', {
                props: {
                  type: 'document'
                }
              })
            } else {
              return h('Icon', {
                props: {
                  type: 'folder'
                }
              })
            }
          }
        },
        {
          key: 'name',
          align: 'center',
          render: (h, { row }) => {
            if (row.type !== 'folder') return row.name
            else {
              return h('a', {
                on: {
                  click: event => {
                    event.stopPropagation()
                    event.preventDefault()
                    this.$router.push({
                      path: '/explorer',
                      query: {
                        path: row.path
                      }
                    })
                  }
                }
              }, row.name)
            }
          }
        },
        {
          key: 'size',
          width: 120,
          align: 'center',
          render (_, { row }) {
            if (row.type === 'file') {
              const size = row.size
              if (size < 1024) return parseFloat(size).toFixed(2) + ' B'
              if (size < 1024 * 1024) return parseFloat(size / 1024).toFixed(2) + ' KB'
              if (size < 1024 * 1024 * 1024) return parseFloat(size / 1024 / 1024).toFixed(2) + ' MB'
              if (size < 1024 * 1024 * 1024 * 1024) return parseFloat(size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
              return parseFloat(size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
            } else {
              return '-'
            }
          }
        },
        {
          key: 'operation',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('ButtonGroup', {
            }, [
              h('Button', {
                props: {
                  type: 'ghost',
                  disabled: params.row.type !== 'file'
                },
                on: {
                  click: event => {
                    event.preventDefault()
                    event.stopPropagation()
                    console.log('http://httppost.cn:8080' + params.row.linked)
                  }
                },
                'class': '.download-link-btn'
              }, '复制链接'),
              h('Button', {
                props: {
                  type: 'ghost'
                },
                on: {
                  click: event => {
                    event.preventDefault()
                    event.stopPropagation()
                    this.delete(params.row.name)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.gotoPath(this.$route.query.path)
    }
  },
  computed: {
    fileList () {
      if (this.filter === '') return this.data
      else {
        return this.data.filter(item => {
          return item.name.toLowerCase().includes(this.filter)
        })
      }
    }
  },
  created () {
    this.$Loading.config({
      color: '#FFFFFF',
      height: 2
    })
    this.gotoPath(this.$route.query.path)
  },
  methods: {
    upload () {
      this.uploader = true
    },
    back () {
      const path = this.$route.query.path.split('/')
      const target = path.slice(0, path.length - 1).join('/')
      this.$router.push({
        path: '/explorer',
        query: {
          path: target === '' ? '/' : target
        }
      })
    },
    closeUploader () {
      this.uploader = false
    },
    handleUpload (status) {
      if (status === 'success') {
        this.gotoPath(this.$route.query.path)
      }
    },
    create () {
      this.creator = true
    },
    cleanFolderName () {
      this.folderName = ''
    },
    createFolder () {
      createDir(this.$route.query.path, this.folderName).then(res => {
        console.log(res)
      })
      this.cleanFolderName()
    },
    delete (file) {
      this.$Loading.start()
      deleteFile(this.$route.query.path, file).then(res => {
        if (res.data.error === 0) {
          this.gotoPath(this.$route.query.path)
          this.$Loading.finish()
        } else {
          this.$Loading.error()
          throw new Error()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    gotoPath (path) {
      this.$Loading.start()
      getFileList(path).then(res => {
        this.$Loading.finish()
        this.data = res.data.map(file => {
          const path = file.path.endsWith('/') ? file.path + file.fname : file.path + '/' + file.fname
          return {
            type: file.isDir === 1 ? 'folder' : 'file',
            name: file.fname,
            path,
            size: file.fileSize,
            linked: file.linked
          }
        })
      }).catch(err => {
        console.log(err)
        this.$Loading.error()
        this.$Message.error('加载文件夹信息失败，请刷新页面。')
      })
    }
  }
}
</script>

<style lang="less">
.uploader-modal {
  .ivu-modal-footer {
    padding: 0 0 10px 0;
    border-top: unset;
  }
}
.explorer {
  .control-panel {
    &-button {
      width: 280px;
      text-align: right;
      float: right;
      overflow: hidden;
    }
    &-input {
      margin-right: 290px;
    }
  }
  .file-list {
    margin-top: 20px;
    background: #fff;
    border-radius: 4px;
    padding: 1px; // Aviod margin collapse
    &-content {
      margin: 4px;
    }
  }
}
</style>
