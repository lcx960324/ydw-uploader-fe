<template>
  <div class="explorer">
    <div class="control-panel">
      <div class="control-panel-button">
        <ButtonGroup>
          <Button icon="arrow-return-left">后退</Button>
          <Button icon="folder" @click="create">新建文件夹</Button>
          <Button icon="upload" @click="upload">上传文件</Button>
        </ButtonGroup>
      </div>
      <div class="control-panel-input">
        <Input placeholder="搜索文件..."></Input>
      </div>
    </div>
    <div class="file-list">
      <div class="file-list-head"></div>
      <div class="file-list-content">
        <Table
          :columns="cols"
          :data="data"
          :show-header="false"
          border
          stripe
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
      <Uploader></Uploader>
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
import { getFileList, createDir } from '@/APIs/explorer'
export default {
  components: { Uploader },
  data () {
    return {
      uploader: false,
      creator: false,
      folderName: '',
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
                    const path = row.path + row.fname
                    this.$route.query.path = path
                    this.gotoPath(path)
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
          render (h, params) {
            return h('ButtonGroup', {
            }, [
              h('Button', {
                props: {
                  type: 'ghost',
                  disabled: params.row.type !== 'file'
                }
              }, '复制链接'),
              h('Button', {
                props: {
                  type: 'ghost'
                }
              }, '删除')
            ])
          }
        }
      ],
      data: []
    }
  },
  created () {
    this.$Loading.config({
      color: '#19be6b',
      height: 2
    })
    this.gotoPath(this.$route.query.path)
  },
  methods: {
    upload () {
      this.uploader = true
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
    gotoPath (path) {
      this.$Loading.start()
      getFileList(path).then(res => {
        this.$Loading.finish()
        this.data = res.data.map(file => {
          return {
            type: file.isDir === 1 ? 'folder' : 'file',
            name: file.fname,
            size: 0
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
