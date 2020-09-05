import pandas as pd
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
import plotly.graph_objects as go
from mpl_toolkits.mplot3d import Axes3D


dest_df = pd.read_csv('data.csv')
pca = PCA(3)
data = dest_df[['Cost', 'History_and_Culture','Water','Mountain','Nightlife']].to_numpy()
names = dest_df['City'].tolist()
transform = pca.fit_transform(data)


fig = plt.figure(figsize=(15, 20))
ax = fig.add_subplot(111, projection='3d')
for i in range(len(transform)): # plot each point + it's index as text above
    x = transform[i][0]
    y = transform[i][1]
    z = transform[i][2]
    label = names[i]
    ax.scatter(x, y, z, color='r')
    ax.text(x, y, z, '%s' % (label), size=5, zorder=1, color='b')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
plt.show()
