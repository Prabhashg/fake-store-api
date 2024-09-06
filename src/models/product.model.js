const defineProductModel = (db, DataTypes) => {
  const Product = db.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating_rate: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    rating_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'name',
      }
    }
  }, {
    timestamps: true,
  })
  
  return Product
}

export default defineProductModel