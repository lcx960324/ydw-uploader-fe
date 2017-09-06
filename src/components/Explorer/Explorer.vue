<template>
  <div class="explorer">
    <div class="control-panel">
      <div class="control-panel-button">
        <ButtonGroup>
          <Button icon="arrow-return-left">后退</Button>
          <Button icon="folder">新建文件夹</Button>
          <Button icon="upload">上传文件</Button>
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
  </div>
</template>

<script>
import Uploader from '@/components/Explorer/Uploader'
import { getFileList } from '@/APIs/explorer'
export default {
  components: { Uploader },
  data () {
    return {
      uploader: true,
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
          render (h, { row }) {
            if (row.type !== 'folder') return row.name
            else return h('a', {}, row.name)
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
    getFileList('/').then(res => {
      console.log(res)
      this.data = res.data.map(file => {
        return {
          type: file.isDir === 1 ? 'folder' : 'file',
          name: file.fname,
          size: 0
        }
      })
    })
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
